import { Injectable } from '@nestjs/common';
import { ZodValidationPipe } from '../../../common/pipes/zod-validation.pipe';
import { signinUserSchema } from '../model/schemas/signin-user.schema';

@Injectable()
export class SignInUserValidationPipe extends ZodValidationPipe<
  typeof signinUserSchema
> {
  constructor() {
    super(signinUserSchema);
  }
}
