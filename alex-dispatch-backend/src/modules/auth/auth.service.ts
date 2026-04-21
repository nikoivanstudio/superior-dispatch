import { JwtService } from '@nestjs/jwt';
import {
  ConflictException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { CreateUserDto, UserEntity } from '../users/model/domain';
import { usersUtils } from '../users/lib/users.utils';
import { PasswordUtils } from './lib/password.utils';
import { DEFAULT_USER_ROLE } from './constants/settings';
import { Prisma } from '../../../generated/prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  public async validateUser({
    username,
    password: pass
  }: {
    username: string;
    password: string;
  }): Promise<UserEntity> {
    const user = await this.userService.getUserByEmail(username);

    if (user && (await bcrypt.compare(pass, user.passwordHash))) {
      const { passwordHash: _, ...rest } = user;

      return usersUtils.removeNullProperties(rest);
    }

    throw new UnauthorizedException();
  }

  public validateUserById(id: number): Promise<UserEntity> {
    return this.userService.getUserById(id);
  }

  public async createUser(user: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userService.getUserByEmail(user.email);

    if (userByEmail) {
      throw new ConflictException('Email already exists');
    }

    const { password, ...restUser } = user;

    const passwordHash = await PasswordUtils.hashPassword(password);

    try {
      return await this.userService.createUser({
        ...restUser,
        passwordHash,
        role: DEFAULT_USER_ROLE
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email already exists');
      }

      throw error;
    }
  }

  public async createToken(payload: {
    id: number;
    email: string;
    role: string;
  }): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
