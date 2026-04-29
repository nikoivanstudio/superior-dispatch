import { Injectable } from '@nestjs/common';
import { ZodValidationPipe } from '../../../../../common/pipes/zod-validation.pipe';
import { createCarrierInfoDtoSchema } from '../model/dto/carrier-info.domain';

@Injectable()
export class UpdateCarrierInfoPipe extends ZodValidationPipe<
  typeof createCarrierInfoDtoSchema
> {
  constructor() {
    super(createCarrierInfoDtoSchema);
  }
}
