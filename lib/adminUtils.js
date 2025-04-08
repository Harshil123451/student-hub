const ADMINS = ['admin@site.com'];

export function isAdmin(email) {
  return ADMINS.includes(email);
}

export function requireAdmin(email) {
  if (!isAdmin(email)) {
    throw new Error('Unauthorized: Admin access required');
  }
} 