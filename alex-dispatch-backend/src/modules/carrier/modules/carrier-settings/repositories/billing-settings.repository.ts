import { Injectable } from '@nestjs/common';
import { DbService } from '../../../../db/db.service';
import {
  BillingSettingsDomain,
  BillingSettingsEntity,
  CreateBillingSettingsDto,
  UpdateBillingSettingsDto
} from '../../carrier-settings/model/dto/billing-settings.domain';
import { objectUtils } from '../../../../../common/lib/object.utils';

const normalizeBillingSettingsData = (
  billingSettings: Omit<CreateBillingSettingsDto, 'userId'>
) => ({
  attachInvoices: billingSettings.attachInvoices ?? null,
  deliveryDates: billingSettings.deliveryDates ?? null,
  invoiceEmail: billingSettings.invoiceEmail ?? null,
  companyName: billingSettings.companyName ?? null
});

@Injectable()
export class BillingSettingsRepository {
  constructor(private readonly dbService: DbService) {}

  public async getBillingSettings(
    userId: number
  ): Promise<BillingSettingsEntity | null> {
    const result = await this.dbService.billingSettings.findUnique({
      where: { userId }
    });

    return result ? objectUtils.removeNullProperties(result) : null;
  }

  public async createBillingSettings(
    billingSettings: CreateBillingSettingsDto
  ): Promise<BillingSettingsEntity> {
    const { userId, ...data } = billingSettings;

    return objectUtils.removeNullProperties(
      await this.dbService.billingSettings.create({
        data: {
          userId,
          ...normalizeBillingSettingsData(data)
        }
      })
    );
  }

  public async upsertBillingSettings(
    billingSettings: CreateBillingSettingsDto
  ): Promise<BillingSettingsEntity> {
    const { userId, ...data } = billingSettings;
    const normalizedData = normalizeBillingSettingsData(data);

    return objectUtils.removeNullProperties(
      await this.dbService.billingSettings.upsert({
        where: { userId },
        create: {
          userId,
          ...normalizedData
        },
        update: normalizedData
      })
    );
  }

  public async updateBillingSettings(
    billingSettings: Partial<UpdateBillingSettingsDto> & { userId: number }
  ): Promise<BillingSettingsEntity> {
    const { userId, ...data } = billingSettings;

    return objectUtils.removeNullProperties(
      await this.dbService.billingSettings.update({
        where: { userId },
        data: normalizeBillingSettingsData(data)
      })
    );
  }

  public deleteBillingSettings(userId: number): Promise<BillingSettingsDomain> {
    return this.dbService.billingSettings.delete({ where: { userId } });
  }
}
