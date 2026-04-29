import { Injectable } from '@nestjs/common';
import { ZodValidationPipe } from '../../../../../common/pipes/zod-validation.pipe';
import { createPModeInfoDtoSchema } from '../model/dto/p-mode-info.domain';

@Injectable()
export class UpdatePModeInfoPipe extends ZodValidationPipe<
  typeof createPModeInfoDtoSchema
> {
  constructor() {
    super(createPModeInfoDtoSchema);
  }
}
