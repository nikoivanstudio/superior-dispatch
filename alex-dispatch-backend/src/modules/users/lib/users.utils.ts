import { UserEntity, UserRole } from '../model/domain';
import { objectUtils } from '../../../common/lib/object.utils';
import { User } from 'generated/prisma/client';

const userRoles = new Set([
  'OWNER',
  'DISPATCHER',
  'DRIVER',
  'BILLING',
  'ADMIN',
  'SUPER_ADMIN'
]);

const isUserRole = (value: unknown): value is UserRole =>
  !!value && typeof value === 'string' && userRoles.has(value);

const parseUserRole = (value: string): UserRole =>
  isUserRole(value) ? value : 'DISPATCHER';

const getUserEntityByDto = (userDto: User): UserEntity => {
  const { passwordHash: _, ...user } = userDto;

  return objectUtils.removeNullProperties({
    ...user,
    role: parseUserRole(user.role)
  });
};

const removeNullProperties = objectUtils.removeNullProperties;

export const usersUtils = { getUserEntityByDto, removeNullProperties };
