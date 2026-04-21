import { Injectable } from '@nestjs/common';
import { ZodValidationPipe } from '../../../common/pipes/zod-validation.pipe';
import { signupDriverSchema } from '../../drivers/model/schemas/driver.schema';

@Injectable()
export class DriverSignupValidationPipe extends ZodValidationPipe<
  typeof signupDriverSchema
> {
  constructor() {
    super(signupDriverSchema);
  }
}
