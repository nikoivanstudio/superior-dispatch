import { Injectable, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Injectable()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
