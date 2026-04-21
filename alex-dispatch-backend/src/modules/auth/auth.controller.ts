import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import type { CreateUserDto, UserEntity } from '../users/model/domain';
import { SignInUserValidationPipe } from './pipes/sign-in-user-validation.pipe';
import { SignUpUserValidationPipe } from './pipes/sign-up-user-validation.pipe';
import { AUTH_COOKIE_NAME, COOKIE_SETTINGS } from './constants/settings';
import { UsersService } from '../users/users.service';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}

  @UsePipes(SignInUserValidationPipe)
  @Post('signin')
  public async signin(
    @Body() data: { username: string; password: string },
    @Res({ passthrough: true }) res: Response
  ): Promise<{ message: string }> {
    const { id, email, role } = await this.authService.validateUser(data);

    const token = await this.authService.createToken({ id, email, role });

    res.cookie(AUTH_COOKIE_NAME, token, COOKIE_SETTINGS);

    return {
      message: 'Logged in successfully'
    };
  }

  @UsePipes(SignUpUserValidationPipe)
  @Post('signup')
  public async signup(
    @Body() user: CreateUserDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<UserEntity> {
    const newUser = await this.authService.createUser(user);

    const token = await this.authService.createToken({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role
    });

    res.cookie(AUTH_COOKIE_NAME, token, COOKIE_SETTINGS);

    return newUser;
  }

  @Post('logout')
  public logout(@Res({ passthrough: true }) res: Response): {
    message: string;
  } {
    res.clearCookie(AUTH_COOKIE_NAME, COOKIE_SETTINGS);

    return {
      message: 'Logged out successfully'
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('auth/me')
  public getCurrentUser(
    @Req() req: Request & { user: UserEntity }
  ): Promise<UserEntity> {
    return this.userService.getUserById(req.user.id);
  }
}
