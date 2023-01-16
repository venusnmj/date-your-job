import * as bcrypt from 'bcrypt';

export function hashPassword(rawPassword: string): string {
  const SALT = bcrypt.genSaltSync();
  return bcrypt.hashSync(rawPassword, SALT);
}

export function validatePasswordHash(
  rawPassword: string,
  hash: string,
): boolean {
  return bcrypt.compareSync(rawPassword, hash);
}

export function hashJwtRefreshToken(rawJwtRefreshToken: string): string {
  const SALT = bcrypt.genSaltSync();
  return bcrypt.hashSync(rawJwtRefreshToken, SALT);
}

export function validateJwtRefreshTokenHash(
  rawJwtRefreshToken: string,
  hash: string,
): boolean {
  return bcrypt.compareSync(rawJwtRefreshToken, hash);
}
