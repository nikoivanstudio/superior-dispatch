import { Injectable } from '@nestjs/common';
import { ZodValidationPipe } from '../../../../../common/pipes/zod-validation.pipe';
import { createDriverAppDtoSchema } from '../model/dto/driver-app.domain';

@Injectable()
export class UpdateDriverAppSettingsPipe extends ZodValidationPipe<
  typeof createDriverAppDtoSchema
> {
  constructor() {
    super(createDriverAppDtoSchema);
  }
}
