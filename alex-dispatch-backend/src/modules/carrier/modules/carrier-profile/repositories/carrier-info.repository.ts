import { Injectable } from '@nestjs/common';
import { DbService } from '../../../../db/db.service';
import {
  CarrierInfoDomain,
  CarrierInfoEntity,
  CreateCarrierInfoDto,
  UpdateCarrierInfoDto
} from '../model/dto/carrier-info.domain';
import { objectUtils } from '../../../../../common/lib/object.utils';

const normalizeCarrierInfoData = (
  carrierInfo: Omit<CreateCarrierInfoDto, 'userId'>
) => ({
  name: carrierInfo.name ?? null,
  address: carrierInfo.address ?? null,
  state: carrierInfo.state ?? null,
  city: carrierInfo.city ?? null,
  zip: carrierInfo.zip ?? null,
  country: carrierInfo.country ?? null,
  mcNumber: carrierInfo.mcNumber ?? null,
  phone: carrierInfo.phone ?? null,
  fax: carrierInfo.fax ?? null,
  email: carrierInfo.email ?? null,
  website: carrierInfo.website ?? null,
  logo: carrierInfo.logo ?? null,
  contactName: carrierInfo.contactName ?? null,
  contactPhone: carrierInfo.contactPhone ?? null,
  contactEmail: carrierInfo.contactEmail ?? null,
  terms: carrierInfo.terms ?? null
});

@Injectable()
export class CarrierInfoRepository {
  constructor(private readonly dbService: DbService) {}

  public async getCarrierInfo(
    userId: number
  ): Promise<CarrierInfoEntity | null> {
    const result = await this.dbService.carrierInfo.findUnique({
      where: { userId }
    });

    return result ? objectUtils.removeNullProperties(result) : null;
  }

  public async createCarrierInfo(
    carrierInfo: CreateCarrierInfoDto
  ): Promise<CarrierInfoEntity> {
    const { userId, ...data } = carrierInfo;

    return objectUtils.removeNullProperties(
      await this.dbService.carrierInfo.create({
        data: {
          userId,
          ...normalizeCarrierInfoData(data)
        }
      })
    );
  }

  public async upsertCarrierInfo(
    carrierInfo: CreateCarrierInfoDto
  ): Promise<CarrierInfoEntity> {
    const { userId, ...data } = carrierInfo;
    const normalizedData = normalizeCarrierInfoData(data);

    return objectUtils.removeNullProperties(
      await this.dbService.carrierInfo.upsert({
        where: { userId },
        create: {
          userId,
          ...normalizedData
        },
        update: normalizedData
      })
    );
  }

  public async updateCarrierInfo(
    carrierInfo: Partial<UpdateCarrierInfoDto> & { userId: number }
  ): Promise<CarrierInfoEntity> {
    const { userId, ...data } = carrierInfo;

    return objectUtils.removeNullProperties(
      await this.dbService.carrierInfo.update({
        where: { userId },
        data: normalizeCarrierInfoData(data)
      })
    );
  }

  public deleteCarrierInfo(userId: number): Promise<CarrierInfoDomain> {
    return this.dbService.carrierInfo.delete({ where: { userId } });
  }
}
