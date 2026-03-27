const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, '..', '..', 'docs', 'postman', 'GameReason-Auth-final.postman_collection.json');
const targetPath = path.join(__dirname, '..', '..', 'docs', 'postman', 'GameReason-Auth-smoke.postman_collection.json');

const smokeRequestNames = new Set([
  'Create user with valid data',
  'Login via valid creds',
  'Generate reset token with exist email',
  'Reset password with valid token',
  'Get all users',
  'Get current user profile',
  'Update current user email with valid data',
  'Delete current user',
]);

function filterItems(items) {
  const filtered = [];

  for (const item of items) {
    if (Array.isArray(item.item)) {
      const nested = filterItems(item.item);
      if (nested.length > 0) {
        filtered.push({ ...item, item: nested });
      }
      continue;
    }

    if (smokeRequestNames.has(item.name)) {
      filtered.push(item);
    }
  }

  return filtered;
}

const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const smoke = {
  ...source,
  info: {
    ...source.info,
    name: 'GameReason Auth Smoke',
    description:
      'Smoke subset of the GameReason auth/account API collection. Intended for quick validation locally and after staging deploy.',
  },
  item: filterItems(source.item),
};

fs.writeFileSync(targetPath, JSON.stringify(smoke, null, 2) + '\n');
console.log(`Wrote smoke collection to ${targetPath}`);
