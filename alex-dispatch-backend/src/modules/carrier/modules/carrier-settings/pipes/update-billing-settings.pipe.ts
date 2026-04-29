import { Injectable } from '@nestjs/common';
import { ZodValidationPipe } from '../../../../../common/pipes/zod-validation.pipe';
import { createBillingSettingsDtoSchema } from '../model/dto/billing-settings.domain';

@Injectable()
export class UpdateBillingSettingsPipe extends ZodValidationPipe<
  typeof createBillingSettingsDtoSchema
> {
  constructor() {
    super(createBillingSettingsDtoSchema);
  }
}
