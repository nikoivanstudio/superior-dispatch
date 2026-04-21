import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserEntity } from '../../../users/model/domain';
import { AuthService } from '../../auth.service';
import { jwtSecret } from '../../constants/settings';

@Injectable()
export class CustomJwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request): string | null =>
          (req?.cookies?.access_token as string) ?? null,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: jwtSecret,
    });
  }

  public async validate(authData: {
    id: number;
    email: string;
    role: string;
  }): Promise<UserEntity> {
    const userEntity = await this.authService.validateUserById(authData.id);

    if (
      authData.email !== userEntity.email ||
      authData.role !== userEntity.role
    ) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return userEntity;
  }
}
