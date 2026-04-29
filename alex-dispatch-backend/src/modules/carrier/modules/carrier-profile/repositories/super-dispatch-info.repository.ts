import { Injectable } from '@nestjs/common';
import { DbService } from '../../../../db/db.service';
import {
  CreateSuperDispatchInfoDto,
  SuperDispatchInfoDomain,
  SuperDispatchInfoEntity,
  UpdateSuperDispatchInfoDto
} from '../model/dto/super-dispatch-info.domain';
import { objectUtils } from '../../../../../common/lib/object.utils';

const normalizeSuperDispatchInfoData = (
  superDispatchInfo: Omit<CreateSuperDispatchInfoDto, 'userId'>
) => ({
  clientId: superDispatchInfo.clientId ?? null,
  clientSecret: superDispatchInfo.clientSecret ?? null,
  carrierId: superDispatchInfo.carrierId ?? null,
  defaultDriverPassword: superDispatchInfo.defaultDriverPassword ?? null,
  enableSuperDispatch: superDispatchInfo.enableSuperDispatch ?? null
});

@Injectable()
export class SuperDispatchInfoRepository {
  constructor(private readonly dbService: DbService) {}

  public async getSuperDispatchInfo(
    userId: number
  ): Promise<SuperDispatchInfoEntity | null> {
    const result = await this.dbService.superDispatchInfo.findUnique({
      where: { userId }
    });

    return result ? objectUtils.removeNullProperties(result) : null;
  }

  public async createSuperDispatchInfo(
    superDispatchInfo: CreateSuperDispatchInfoDto
  ): Promise<SuperDispatchInfoEntity> {
    const { userId, ...data } = superDispatchInfo;

    return objectUtils.removeNullProperties(
      await this.dbService.superDispatchInfo.create({
        data: {
          userId,
          ...normalizeSuperDispatchInfoData(data)
        }
      })
    );
  }

  public async upsertSuperDispatchInfo(
    superDispatchInfo: CreateSuperDispatchInfoDto
  ): Promise<SuperDispatchInfoEntity> {
    const { userId, ...data } = superDispatchInfo;
    const normalizedData = normalizeSuperDispatchInfoData(data);

    return objectUtils.removeNullProperties(
      await this.dbService.superDispatchInfo.upsert({
        where: { userId },
        create: {
          userId,
          ...normalizedData
        },
        update: normalizedData
      })
    );
  }

  public async updateSuperDispatchInfo(
    superDispatchInfo: Partial<UpdateSuperDispatchInfoDto> & { userId: number }
  ): Promise<SuperDispatchInfoEntity> {
    const { userId, ...data } = superDispatchInfo;

    return objectUtils.removeNullProperties(
      await this.dbService.superDispatchInfo.update({
        where: { userId },
        data: normalizeSuperDispatchInfoData(data)
      })
    );
  }

  public deleteSuperDispatchInfo(
    userId: number
  ): Promise<SuperDispatchInfoDomain> {
    return this.dbService.superDispatchInfo.delete({ where: { userId } });
  }
}
