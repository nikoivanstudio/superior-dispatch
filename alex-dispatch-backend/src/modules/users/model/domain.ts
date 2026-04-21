import { WithoutNull } from '../../../common/lib/object.utils';
import { z } from 'zod';
import { userRoleSchema, userSchema } from '@alex-dispatch/validation-schemas';

export type UserRole = z.infer<typeof userRoleSchema>;
export type UserDto = z.infer<typeof userSchema>;

export type CreateUserDto = Omit<UserDto, 'id' | 'passwordHash'> & {
  password: string;
};

export type UserEntity = Omit<
  WithoutNull<UserDto>,
  'passwordHash' | 'password'
>;
