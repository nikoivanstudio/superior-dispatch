import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { UserDto } from './model/domain';
import { User } from 'generated/prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private readonly dbService: DbService) {}

  public getUsers(): Promise<User[]> {
    return this.dbService.user.findMany();
  }

  public getUniqUser(id: number): Promise<User | null> {
    return this.dbService.user.findUnique({ where: { id } });
  }

  public getUserByEmail(email: string): Promise<User | null> {
    return this.dbService.user.findUnique({ where: { email } });
  }

  public createUser(user: Omit<UserDto, 'id'>): Promise<User> {
    return this.dbService.user.create({ data: user });
  }

  public updateUser(user: Partial<UserDto> & { id: number }): Promise<User> {
    return this.dbService.user.update({ where: { id: user.id }, data: user });
  }

  public deleteUser(id: number): Promise<User> {
    return this.dbService.user.delete({ where: { id: id } });
  }
}
