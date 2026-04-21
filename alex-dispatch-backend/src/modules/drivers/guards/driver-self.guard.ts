import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { DriverEntity } from '../model/domain';

@Injectable()
export class DriverSelfGuard extends AuthGuard('driver-jwt') {
  public handleRequest<TUser = DriverEntity>(
    err: Error,
    user: DriverEntity | undefined,
    _info: unknown,
    context: ExecutionContext
  ) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    const req = context.switchToHttp().getRequest<Request<{ email: string }>>();
    const emailByToken = user.email?.trim().toLowerCase();
    const reqEmail = req.params.email?.trim().toLowerCase();

    if (!reqEmail || emailByToken !== reqEmail) {
      throw new ForbiddenException('You can request only your email!');
    }

    return user as TUser;
  }
}
