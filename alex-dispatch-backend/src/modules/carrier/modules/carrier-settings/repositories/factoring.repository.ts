import { Injectable } from '@nestjs/common';
import { DbService } from '../../../../db/db.service';
import {
  CreateFactoringDto,
  FactoringDomain,
  FactoringEntity,
  UpdateFactoringDto
} from '../model/dto/factoring.domain';
import { objectUtils } from '../../../../../common/lib/object.utils';

const normalizeFactoringData = (
  factoring: Omit<CreateFactoringDto, 'userId'>
) => ({
  attachInvoices: factoring.attachInvoices ?? null,
  deliveryDates: factoring.deliveryDates ?? null,
  invoiceEmail: factoring.invoiceEmail ?? null,
  companyName: factoring.companyName ?? null,
  address: factoring.address ?? null,
  city: factoring.city ?? null,
  state: factoring.state ?? null,
  phone: factoring.phone ?? null,
  factoringFee: factoring.factoringFee ?? null
});

@Injectable()
export class FactoringRepository {
  constructor(private readonly dbService: DbService) {}

  public async getFactoring(userId: number): Promise<FactoringEntity | null> {
    const result = await this.dbService.factoring.findUnique({
      where: { userId }
    });

    return result ? objectUtils.removeNullProperties(result) : null;
  }

  public async createFactoring(
    factoring: CreateFactoringDto
  ): Promise<FactoringEntity> {
    const { userId, ...data } = factoring;

    return objectUtils.removeNullProperties(
      await this.dbService.factoring.create({
        data: {
          userId,
          ...normalizeFactoringData(data)
        }
      })
    );
  }

  public async upsertFactoring(
    factoring: CreateFactoringDto
  ): Promise<FactoringEntity> {
    const { userId, ...data } = factoring;
    const normalizedData = normalizeFactoringData(data);

    return objectUtils.removeNullProperties(
      await this.dbService.factoring.upsert({
        where: { userId },
        create: {
          userId,
          ...normalizedData
        },
        update: normalizedData
      })
    );
  }

  public async updateFactoring(
    factoring: Partial<UpdateFactoringDto> & { userId: number }
  ): Promise<FactoringEntity> {
    const { userId, ...data } = factoring;

    return objectUtils.removeNullProperties(
      await this.dbService.factoring.update({
        where: { userId },
        data: normalizeFactoringData(data)
      })
    );
  }

  public deleteFactoring(userId: number): Promise<FactoringDomain> {
    return this.dbService.factoring.delete({ where: { userId } });
  }
}
