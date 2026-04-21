import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { DriversRepository } from './repositories/drivers.repository';
import { DriverDto, DriverEntity } from './model/domain';
import { DriversSecurityUtils } from './lib/drivers-security.utils';
import { BatchPayload } from 'generated/prisma/internal/prismaNamespace';
import { SuperDispatchService } from '../super-dispatch/super-dispatch.service';

@Injectable()
export class DriversService {
  constructor(
    private readonly driversRepository: DriversRepository,
    private readonly dispatchService: SuperDispatchService
  ) {}

  public async getUnsafeDriver(email: string): Promise<DriverDto | null> {
    return this.driversRepository.getDriverByEmail(email);
  }

  public async getDriverInfo(email: string): Promise<DriverEntity | null> {
    const dispatchDriver = await this.dispatchService.getDriverInfo(email);

    const driver = await this.getDriverEntityByIdOrEmail(email);

    if (!driver) {
      throw new NotFoundException(`Driver with email ${email} does not exist`);
    }

    if (!dispatchDriver) {
      throw new BadRequestException(
        `Driver with email ${email} does not registered in Super Dispatch`
      );
    }

    const { truck_capacity, ...rest } = dispatchDriver;

    return this.updateDriver({
      ...driver,
      ...rest,
      truckCapacity: truck_capacity || undefined
    });
  }

  public async getDriverEntityByIdOrEmail(
    arg: number | string
  ): Promise<DriverEntity | null> {
    const driverDto =
      typeof arg === 'number'
        ? await this.driversRepository.getDriverById(arg)
        : await this.driversRepository.getDriverByEmail(arg);

    return driverDto ? DriversSecurityUtils.driverDtoToEntity(driverDto) : null;
  }

  public async getDriversEntities(): Promise<DriverEntity[]> {
    const driversDtos = await this.driversRepository.getDrivers();

    return DriversSecurityUtils.driverDtoToEntityArray(driversDtos);
  }

  public async createDriver(driverDto: DriverDto): Promise<DriverEntity> {
    const driver = await this.driversRepository.createDriver(driverDto);

    return DriversSecurityUtils.driverDtoToEntity(driver);
  }

  public createManyDrivers(driversDto: DriverDto[]): Promise<BatchPayload> {
    return this.driversRepository.createManyDrivers(driversDto);
  }

  public async updateDriver(
    driverDto: Partial<DriverDto> & { id: number }
  ): Promise<DriverEntity> {
    const currentDriver = await this.driversRepository.getDriverById(
      driverDto.id
    );

    if (!currentDriver) {
      throw new NotFoundException(`Driver not found by id ${driverDto.id}`);
    }

    const updatedDriver = await this.driversRepository.updateDriver(driverDto);

    return DriversSecurityUtils.driverDtoToEntity(updatedDriver);
  }

  public async updateManyDrivers(
    driversDto: DriverDto[]
  ): Promise<BatchPayload> {
    return this.driversRepository.updateManyDrivers(driversDto);
  }

  public async deleteDriver(id: number): Promise<DriverEntity> {
    const currentDriver = await this.driversRepository.getDriverById(id);

    if (!currentDriver) {
      throw new NotFoundException(`Driver not found by id ${id}`);
    }

    const deletedDriver = await this.driversRepository.deleteDriver(id);

    return DriversSecurityUtils.driverDtoToEntity(deletedDriver);
  }

  public deleteManyDrivers(): Promise<BatchPayload> {
    return this.driversRepository.deleteManyDrivers();
  }
}
