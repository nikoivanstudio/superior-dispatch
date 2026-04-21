import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { UserDto, UserEntity } from './model/domain';
import { UsersRepository } from './users.repository';
import { usersUtils } from './lib/users.utils';
import { User } from 'generated/prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async getUserById(id: number): Promise<UserEntity> {
    const user = await this.usersRepository.getUniqUser(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return usersUtils.getUserEntityByDto(user);
  }

  public async getUserEntityByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.usersRepository.getUserByEmail(email);

    return user ? usersUtils.getUserEntityByDto(user) : null;
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.getUserByEmail(email);
  }

  public async getUsers(): Promise<UserEntity[]> {
    const users = await this.usersRepository.getUsers();

    return users.map(usersUtils.getUserEntityByDto);
  }

  public async createUser(
    createUserDto: Omit<UserDto, 'id'>
  ): Promise<UserEntity> {
    const user = await this.usersRepository.createUser(createUserDto);

    if (!user) {
      throw new BadRequestException('Signup failed');
    }

    return usersUtils.getUserEntityByDto(user);
  }

  public async updateUser(user: UserDto): Promise<UserEntity> {
    const currentUser = await this.usersRepository.getUniqUser(user.id);

    if (!currentUser) {
      throw new NotFoundException(`User with id ${user.id} not found`);
    }

    const updatedUser = await this.usersRepository.updateUser(user);

    return usersUtils.getUserEntityByDto(updatedUser);
  }

  public async deleteUser(id: number): Promise<UserEntity> {
    await this.getUserById(id);

    const userDto = await this.usersRepository.deleteUser(id);

    if (!userDto) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return usersUtils.getUserEntityByDto(userDto);
  }
}
