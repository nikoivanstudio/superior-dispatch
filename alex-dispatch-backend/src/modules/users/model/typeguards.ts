import { UserEntity } from './domain';

const isUserEntity = (value: unknown): value is UserEntity => !!value;

export const usersTypeguards = { isUserEntity };
