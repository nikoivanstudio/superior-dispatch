import { Injectable } from '@nestjs/common';
import { ZodValidationPipe } from '../../../../../common/pipes/zod-validation.pipe';
import { createFactoringDtoSchema } from '../model/dto/factoring.domain';

@Injectable()
export class UpdateFactoringPipe extends ZodValidationPipe<
  typeof createFactoringDtoSchema
> {
  constructor() {
    super(createFactoringDtoSchema);
  }
}
