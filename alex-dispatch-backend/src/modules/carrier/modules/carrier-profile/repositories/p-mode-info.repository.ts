import { Injectable } from '@nestjs/common';
import { DbService } from '../../../../db/db.service';
import {
  CreatePModeInfoDto,
  PModeInfoDomain,
  PModeInfoEntity,
  UpdatePModeInfoDto
} from '../model/dto/p-mode-info.domain';
import { objectUtils } from '../../../../../common/lib/object.utils';

const normalizePModeInfoData = (
  pModeInfo: Omit<CreatePModeInfoDto, 'userId'>
) => ({
  name: pModeInfo.name ?? null,
  address: pModeInfo.address ?? null,
  state: pModeInfo.state ?? null,
  city: pModeInfo.city ?? null,
  zip: pModeInfo.zip ?? null,
  country: pModeInfo.country ?? null,
  mcNumber: pModeInfo.mcNumber ?? null,
  phone: pModeInfo.phone ?? null,
  fax: pModeInfo.fax ?? null,
  email: pModeInfo.email ?? null,
  website: pModeInfo.website ?? null,
  logo: pModeInfo.logo ?? null,
  contactName: pModeInfo.contactName ?? null,
  contactPhone: pModeInfo.contactPhone ?? null,
  contactEmail: pModeInfo.contactEmail ?? null,
  terms: pModeInfo.terms ?? null
});

@Injectable()
export class PModeInfoRepository {
  constructor(private readonly dbService: DbService) {}

  public async getPModeInfo(userId: number): Promise<PModeInfoEntity | null> {
    const result = await this.dbService.pModeInfo.findUnique({
      where: { userId }
    });

    return result ? objectUtils.removeNullProperties(result) : null;
  }

  public async createPModeInfo(
    pModeInfo: CreatePModeInfoDto
  ): Promise<PModeInfoEntity> {
    const { userId, ...data } = pModeInfo;

    return objectUtils.removeNullProperties(
      await this.dbService.pModeInfo.create({
        data: {
          userId,
          ...normalizePModeInfoData(data)
        }
      })
    );
  }

  public async upsertPModeInfo(
    pModeInfo: CreatePModeInfoDto
  ): Promise<PModeInfoEntity> {
    const { userId, ...data } = pModeInfo;
    const normalizedData = normalizePModeInfoData(data);

    return objectUtils.removeNullProperties(
      await this.dbService.pModeInfo.upsert({
        where: { userId },
        create: {
          userId,
          ...normalizedData
        },
        update: normalizedData
      })
    );
  }

  public async updatePModeInfo(
    pModeInfo: Partial<UpdatePModeInfoDto> & { userId: number }
  ): Promise<PModeInfoEntity> {
    const { userId, ...data } = pModeInfo;

    return objectUtils.removeNullProperties(
      await this.dbService.pModeInfo.update({
        where: { userId },
        data: normalizePModeInfoData(data)
      })
    );
  }

  public deletePModeInfo(userId: number): Promise<PModeInfoDomain> {
    return this.dbService.pModeInfo.delete({ where: { userId } });
  }
}
