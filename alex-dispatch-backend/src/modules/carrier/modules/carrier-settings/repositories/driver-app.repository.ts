import { Injectable } from '@nestjs/common';
import { DbService } from '../../../../db/db.service';
import {
  CreateDriverAppDto,
  DriverAppDomain,
  DriverAppEntity,
  UpdateDriverAppDto
} from '../model/dto/driver-app.domain';
import { objectUtils } from '../../../../../common/lib/object.utils';

@Injectable()
export class DriverAppRepository {
  constructor(private readonly dbService: DbService) {}

  public async getDriverAppSettings(
    userId: number
  ): Promise<DriverAppEntity | null> {
    const result = await this.dbService.driverAppSettings.findUnique({
      where: { userId }
    });

    return result ? objectUtils.removeNullProperties(result) : null;
  }

  public async createDriverAppSettings(
    driverAppSettings: CreateDriverAppDto
  ): Promise<DriverAppEntity> {
    return objectUtils.removeNullProperties(
      await this.dbService.driverAppSettings.create({ data: driverAppSettings })
    );
  }

  public async upsertDriverAppSettings(
    driverAppSettings: CreateDriverAppDto
  ): Promise<DriverAppEntity> {
    const { userId, ...data } = driverAppSettings;

    return objectUtils.removeNullProperties(
      await this.dbService.driverAppSettings.upsert({
        where: { userId },
        create: driverAppSettings,
        update: data
      })
    );
  }

  public async updateDriverAppSettings(
    driverAppSettings: Partial<UpdateDriverAppDto> & { userId: number }
  ): Promise<DriverAppEntity> {
    return objectUtils.removeNullProperties(
      await this.dbService.driverAppSettings.update({
        where: { userId: driverAppSettings.userId },
        data: driverAppSettings
      })
    );
  }

  public deleteDriverAppSettings(userId: number): Promise<DriverAppDomain> {
    return this.dbService.driverAppSettings.delete({ where: { userId } });
  }
}
