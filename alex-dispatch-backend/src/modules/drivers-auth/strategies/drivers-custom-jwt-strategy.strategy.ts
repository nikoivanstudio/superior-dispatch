import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtSecret } from '../constants/settings';
import { DriverEntity } from '../../drivers/model/domain';
import { DriversAuthService } from '../drivers-auth.service';

@Injectable()
export class DriversCustomJwtStrategy extends PassportStrategy(
  Strategy,
  'driver-jwt'
) {
  constructor(private readonly driverAuthService: DriversAuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken()
      ]),
      secretOrKey: jwtSecret
    });
  }

  public async validate(authData: {
    id: number;
    email: string;
    status: string;
  }): Promise<DriverEntity> {
    const driverEntity = await this.driverAuthService.getDriverByIdOrEmail(
      authData.id
    );

    if (
      authData.email !== driverEntity.email ||
      authData.status !== driverEntity.status
    ) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return driverEntity;
  }
}
