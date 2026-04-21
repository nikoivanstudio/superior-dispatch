import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtSecret, tokenLifeTime } from './constants/settings';
import { CustomJwtStrategy } from './model/strategies/custom-jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: tokenLifeTime }
    })
  ],
  providers: [AuthService, CustomJwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
