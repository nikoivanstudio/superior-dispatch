import { Injectable } from '@nestjs/common';
import { SuperDispatchDriverService } from './services/super-dispatch-driver.service';
import { DispatchDriver } from './model/driver.domain';

@Injectable()
export class SuperDispatchService {
  constructor(private readonly driversService: SuperDispatchDriverService) {}

  public async getDriverInfo(
    email: string
  ): Promise<DispatchDriver | undefined> {
    const drivers = await this.driversService.getDriverInfo();

    return drivers.find((driver) => driver.email === email);
  }

  public synchronizeDrivers(): void {}
}
