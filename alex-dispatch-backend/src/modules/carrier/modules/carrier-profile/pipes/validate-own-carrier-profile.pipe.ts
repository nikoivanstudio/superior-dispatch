import {
  ForbiddenException,
  Inject,
  Injectable,
  PipeTransform,
  Scope
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import type { Request } from 'express';
import type { UserEntity } from '../../../../users/model/domain';

@Injectable({ scope: Scope.REQUEST })
export class ValidateOwnCarrierProfilePipe
  implements PipeTransform<{ userId: number }, { userId: number }>
{
  constructor(
    @Inject(REQUEST)
    private readonly request: Request & { user: UserEntity }
  ) {}

  public transform(dto: { userId: number }): { userId: number } {
    if (Number(this.request.user.id) !== Number(dto.userId)) {
      throw new ForbiddenException('You can change only your own settings!');
    }

    return dto;
  }
}
