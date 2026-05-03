import cors from 'cors';
import express from 'express';
import {
  createHmac,
  randomBytes,
  randomUUID,
  scrypt as scryptCallback,
  timingSafeEqual,
} from 'node:crypto';
import { promisify } from 'node:util';
import { Prisma } from '@prisma/client';
import { prisma } from './db.js';
import {
  validateConfirmPassword,
  validateEmail,
  validateOptionalFullName,
  validateOptionalTermsAccepted,
  validatePassword,
} from './validation.js';

const scrypt = promisify(scryptCallback);
const app = express();
const port = Number(process.env.PORT ?? 3001);
const tokenSecret = process.env.AUTH_TOKEN_SECRET ?? 'gamereason-dev-secret';
const accessTokenTtlMs = Number(process.env.ACCESS_TOKEN_TTL_MS ?? 1000 * 60 * 60 * 12);
const passwordResetTtlMs = Number(process.env.PASSWORD_RESET_TTL_MS ?? 1000 * 60 * 15);
const passwordResetRateLimitWindowMs = 1000 * 30;
const maxPasswordResetRequestsPerWindow = 3;

app.use(cors());
app.use(express.json());

function serializeUser(user) {
  return {
    id: user.id,
    email: user.email,
  };
}

function toBase64Url(value) {
  return Buffer.from(value)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function fromBase64Url(value) {
  const normalizedValue = value.replace(/-/g, '+').replace(/_/g, '/');
  const padding = normalizedValue.length % 4 === 0 ? '' : '='.repeat(4 - (normalizedValue.length % 4));
  return Buffer.from(`${normalizedValue}${padding}`, 'base64');
}

function createAccessToken(user) {
  const payload = {
    sub: user.id,
    email: user.email,
    exp: Date.now() + accessTokenTtlMs,
  };

  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const signature = createHmac('sha256', tokenSecret).update(encodedPayload).digest();
  const encodedSignature = toBase64Url(signature);

  return `${encodedPayload}.${encodedSignature}`;
}

function hashOpaqueToken(token) {
  return createHmac('sha256', tokenSecret).update(token).digest('hex');
}

function createPasswordResetToken() {
  return randomBytes(32).toString('hex');
}

function verifyAccessToken(token) {
  if (!token || !token.includes('.')) {
    return null;
  }

  const [encodedPayload, encodedSignature] = token.split('.');

  if (!encodedPayload || !encodedSignature) {
    return null;
  }

  const expectedSignature = createHmac('sha256', tokenSecret).update(encodedPayload).digest();
  const providedSignature = fromBase64Url(encodedSignature);

  if (providedSignature.length !== expectedSignature.length) {
    return null;
  }

  if (!timingSafeEqual(providedSignature, expectedSignature)) {
    return null;
  }

  const payload = JSON.parse(fromBase64Url(encodedPayload).toString('utf8'));

  if (!payload?.sub || !payload?.exp || payload.exp < Date.now()) {
    return null;
  }

  return payload;
}

async function requireAuth(request, response, next) {
  const authorizationHeader = request.headers.authorization ?? '';
  const [scheme, token] = authorizationHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return response.status(401).json({
      message: 'Authentication required',
    });
  }

  const payload = verifyAccessToken(token);

  if (!payload) {
    return response.status(401).json({
      message: 'Invalid or expired access token',
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: payload.sub,
    },
  });

  if (!user) {
    return response.status(401).json({
      message: 'User not found for this token',
    });
  }

  request.auth = {
    token,
    user,
  };

  return next();
}

async function hashPassword(password) {
  const salt = randomUUID();
  const derivedKey = await scrypt(password, salt, 64);
  return `${salt}:${derivedKey.toString('hex')}`;
}

async function verifyPassword(password, storedHash) {
  const [salt, key] = storedHash.split(':');
  const derivedKey = await scrypt(password, salt, 64);
  return timingSafeEqual(Buffer.from(key, 'hex'), derivedKey);
}

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', database: 'configured' });
});

app.post('/api/auth/forgot-password', async (request, response) => {
  const { email = '' } = request.body ?? {};
  const emailError = validateEmail(email);

  if (emailError) {
    return response.status(400).json({
      message: 'Forgot password failed',
      errors: {
        email: emailError,
      },
    });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  if (!user) {
    return response.json({
      message: 'If an account with this email exists, a reset token has been generated',
    });
  }

  const rateLimitWindowStart = new Date(Date.now() - passwordResetRateLimitWindowMs);
  const recentResetRequestCount = await prisma.passwordResetToken.count({
    where: {
      userId: user.id,
      createdAt: {
        gte: rateLimitWindowStart,
      },
    },
  });

  if (recentResetRequestCount >= maxPasswordResetRequestsPerWindow) {
    return response.status(429).json({
      message: 'Too many reset requests. Please wait 30 seconds before trying again.',
      retryAfterSeconds: 30,
    });
  }

  const now = new Date();
  const resetToken = createPasswordResetToken();
  const tokenHash = hashOpaqueToken(resetToken);
  const expiresAt = new Date(now.getTime() + passwordResetTtlMs);

  await prisma.$transaction([
    prisma.passwordResetToken.updateMany({
      where: {
        userId: user.id,
        usedAt: null,
        invalidatedAt: null,
      },
      data: {
        invalidatedAt: now,
      },
    }),
    prisma.passwordResetToken.create({
      data: {
        tokenHash,
        expiresAt,
        userId: user.id,
      },
    }),
  ]);

  return response.json({
    message: 'If an account with this email exists, a reset token has been generated',
    resetToken,
    expiresAt: expiresAt.toISOString(),
  });
});

app.get('/api/auth/me', requireAuth, async (request, response) => {
  return response.json({
    user: serializeUser(request.auth.user),
  });
});

app.get('/api/users', requireAuth, async (_request, response) => {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return response.json({
    users: users.map(serializeUser),
  });
});

app.patch('/api/users/me', requireAuth, async (request, response) => {
  const { email = '' } = request.body ?? {};
  const emailError = validateEmail(email);

  if (emailError) {
    return response.status(400).json({
      message: 'Profile update failed',
      errors: {
        email: emailError,
      },
    });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  if (existingUser && existingUser.id !== request.auth.user.id) {
    return response.status(400).json({
      message: 'Profile update failed',
      errors: {
        email: 'This email is already registered',
      },
    });
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: request.auth.user.id,
    },
    data: {
      email: normalizedEmail,
    },
  });
  const accessToken = createAccessToken(updatedUser);

  return response.json({
    message: 'Profile updated successfully',
    accessToken,
    user: serializeUser(updatedUser),
  });
});

app.post('/api/auth/register', async (request, response) => {
  const {
    email = '',
    password = '',
    confirmPassword = '',
    fullName,
    termsAccepted,
  } = request.body ?? {};
  const errors = {
    fullName: validateOptionalFullName(fullName),
    email: validateEmail(email),
    password: validatePassword(password),
    confirmPassword: validateConfirmPassword(password, confirmPassword),
    termsAccepted: validateOptionalTermsAccepted(termsAccepted),
  };

  const fieldErrors = Object.fromEntries(
    Object.entries(errors).filter(([, value]) => Boolean(value)),
  );

  if (Object.keys(fieldErrors).length > 0) {
    return response.status(400).json({
      message: 'Registration failed',
      errors: fieldErrors,
    });
  }

  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  if (existingUser) {
    return response.status(400).json({
      message: 'Registration failed',
      errors: {
        email: 'This email is already registered',
      },
    });
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      email: normalizedEmail,
      passwordHash,
    },
  });
  const accessToken = createAccessToken(user);

  return response.status(201).json({
    message: 'User created successfully',
    accessToken,
    user: serializeUser(user),
  });
});

app.post('/api/auth/login', async (request, response) => {
  const { email = '', password = '' } = request.body ?? {};
  const errors = {
    email: validateEmail(email),
    password: password ? '' : 'Password is required',
  };

  const fieldErrors = Object.fromEntries(
    Object.entries(errors).filter(([, value]) => Boolean(value)),
  );

  if (Object.keys(fieldErrors).length > 0) {
    return response.status(400).json({
      message: 'Login failed',
      errors: fieldErrors,
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email.trim().toLowerCase(),
    },
  });

  if (!user) {
    return response.status(401).json({
      message: 'Invalid email or password',
    });
  }

  const isPasswordValid = await verifyPassword(password, user.passwordHash);

  if (!isPasswordValid) {
    return response.status(401).json({
      message: 'Invalid email or password',
    });
  }
  const accessToken = createAccessToken(user);

  return response.json({
    message: 'Login successful',
    accessToken,
    user: serializeUser(user),
  });
});

app.post('/api/auth/reset-password', async (request, response) => {
  const { token = '', password = '', confirmPassword = '' } = request.body ?? {};
  const errors = {
    token: typeof token === 'string' && token.trim() ? '' : 'Reset token is required',
    password: validatePassword(password),
    confirmPassword: validateConfirmPassword(password, confirmPassword),
  };

  const fieldErrors = Object.fromEntries(
    Object.entries(errors).filter(([, value]) => Boolean(value)),
  );

  if (Object.keys(fieldErrors).length > 0) {
    return response.status(400).json({
      message: 'Reset password failed',
      errors: fieldErrors,
    });
  }

  const now = new Date();
  const tokenHash = hashOpaqueToken(token.trim());
  const resetTokenRecord = await prisma.passwordResetToken.findUnique({
    where: {
      tokenHash,
    },
    include: {
      user: true,
    },
  });

  if (
    !resetTokenRecord ||
    resetTokenRecord.usedAt ||
    resetTokenRecord.invalidatedAt ||
    resetTokenRecord.expiresAt < now
  ) {
    return response.status(400).json({
      message: 'Reset password failed',
      errors: {
        token: 'Reset token is invalid or expired',
      },
    });
  }

  const passwordHash = await hashPassword(password);

  await prisma.$transaction([
    prisma.user.update({
      where: {
        id: resetTokenRecord.userId,
      },
      data: {
        passwordHash,
      },
    }),
    prisma.passwordResetToken.update({
      where: {
        id: resetTokenRecord.id,
      },
      data: {
        usedAt: now,
      },
    }),
    prisma.passwordResetToken.updateMany({
      where: {
        userId: resetTokenRecord.userId,
        id: {
          not: resetTokenRecord.id,
        },
        usedAt: null,
        invalidatedAt: null,
      },
      data: {
        invalidatedAt: now,
      },
    }),
  ]);

  const accessToken = createAccessToken(resetTokenRecord.user);

  return response.json({
    message: 'Password reset successful',
    accessToken,
    user: serializeUser(resetTokenRecord.user),
  });
});

app.delete('/api/users/:id', requireAuth, async (request, response) => {
  const { id } = request.params;

  if (!id?.trim()) {
    return response.status(400).json({
      message: 'User id is required',
    });
  }

  if (request.auth.user.id !== id.trim()) {
    return response.status(403).json({
      message: 'You can delete only your own account',
    });
  }

  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: id.trim(),
      },
    });

    return response.json({
      message: 'User deleted successfully',
      user: serializeUser(deletedUser),
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return response.status(404).json({
        message: 'User not found',
      });
    }

    throw error;
  }
});

app.use((error, _request, response, _next) => {
  console.error(error);

  if (error instanceof SyntaxError && 'body' in error) {
    return response.status(400).json({
      message: 'Invalid JSON body',
    });
  }

  response.status(500).json({
    message: 'Internal server error',
  });
});

app.listen(port, () => {
  console.log(`GameReason API listening on http://localhost:${port}`);
});
