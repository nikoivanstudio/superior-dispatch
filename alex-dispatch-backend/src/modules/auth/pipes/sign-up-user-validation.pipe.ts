import { Injectable } from '@nestjs/common';
import { ZodValidationPipe } from '../../../common/pipes/zod-validation.pipe';
import { createUserDtoSchema } from '@alex-dispatch/validation-schemas';

@Injectable()
export class SignUpUserValidationPipe extends ZodValidationPipe<
  typeof createUserDtoSchema
> {
  constructor() {
    super(createUserDtoSchema);
  }
}
