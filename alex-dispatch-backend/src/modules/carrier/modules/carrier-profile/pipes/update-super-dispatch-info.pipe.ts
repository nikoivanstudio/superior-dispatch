import { Injectable } from '@nestjs/common';
import { ZodValidationPipe } from '../../../../../common/pipes/zod-validation.pipe';
import { createSuperDispatchInfoDtoSchema } from '../model/dto/super-dispatch-info.domain';

@Injectable()
export class UpdateSuperDispatchInfoPipe extends ZodValidationPipe<
  typeof createSuperDispatchInfoDtoSchema
> {
  constructor() {
    super(createSuperDispatchInfoDtoSchema);
  }
}
