import { Injectable } from '@nestjs/common';
import { DbService } from '../../db/db.service';
import { DriverDto } from '../model/domain';
import { BatchPayload } from 'generated/prisma/internal/prismaNamespace';

@Injectable()
export class DriversRepository {
  constructor(private readonly dbService: DbService) {}

  public getDrivers(): Promise<DriverDto[]> {
    return this.dbService.driver.findMany();
  }

  public getDriverById(id: number): Promise<DriverDto | null> {
    return this.dbService.driver.findFirst({ where: { id } });
  }

  public getDriverByEmail(email: string): Promise<DriverDto | null> {
    return this.dbService.driver.findUnique({ where: { email } });
  }

  public createDriver(driver: DriverDto): Promise<DriverDto> {
    return this.dbService.driver.create({ data: driver });
  }

  public createManyDrivers(drivers: DriverDto[]): Promise<BatchPayload> {
    return this.dbService.driver.createMany({ data: drivers });
  }

  public updateDriver(
    driverDto: Partial<DriverDto> & { id: number }
  ): Promise<DriverDto> {
    return this.dbService.driver.update({
      where: { id: driverDto.id },
      data: driverDto
    });
  }

  public updateManyDrivers(driversDtos: DriverDto[]) {
    return this.dbService.driver.updateMany({ data: driversDtos });
  }

  public deleteDriver(id: number): Promise<DriverDto> {
    return this.dbService.driver.delete({ where: { id } });
  }

  public deleteManyDrivers(): Promise<BatchPayload> {
    return this.dbService.driver.deleteMany();
  }
}
