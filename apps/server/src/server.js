import cors from 'cors';
import express from 'express';
import { randomUUID, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { Prisma } from '@prisma/client';
import { prisma } from './db.js';
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
} from './validation.js';

const scrypt = promisify(scryptCallback);
const app = express();
const port = Number(process.env.PORT ?? 3001);

app.use(cors());
app.use(express.json());

function serializeUser(user) {
  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
  };
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

app.get('/api/users', async (_request, response) => {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return response.json({
    users: users.map(serializeUser),
  });
});

app.post('/api/auth/register', async (request, response) => {
  const { email = '', password = '', confirmPassword = '' } = request.body ?? {};
  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
    confirmPassword: validateConfirmPassword(password, confirmPassword),
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

  return response.status(201).json({
    message: 'User created successfully',
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

  return response.json({
    message: 'Login successful',
    user: serializeUser(user),
  });
});

app.delete('/api/users/:id', async (request, response) => {
  const { id } = request.params;

  if (!id?.trim()) {
    return response.status(400).json({
      message: 'User id is required',
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
  response.status(500).json({
    message: 'Internal server error',
  });
});

app.listen(port, () => {
  console.log(`NovaCart API listening on http://localhost:${port}`);
});
