import { Injectable } from '@nestjs/common';
import { ZodValidationPipe } from '../../../../../common/pipes/zod-validation.pipe';
import { createNotificationsDtoSchema } from '../../carrier-settings/model/dto/notifications.domain';

@Injectable()
export class UpdateNotificationsPipe extends ZodValidationPipe<
  typeof createNotificationsDtoSchema
> {
  constructor() {
    super(createNotificationsDtoSchema);
  }
}
