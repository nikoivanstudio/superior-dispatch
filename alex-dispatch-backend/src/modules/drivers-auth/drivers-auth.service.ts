import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import bcrypt from 'bcrypt';
import { DriversService } from '../drivers/drivers.service';
import { DriverDto, DriverEntity } from '../drivers/model/domain';

import { PasswordUtils } from './lib/password.utils';
import { JwtService } from '@nestjs/jwt';
import { tokenLifeTime } from './constants/settings';
import { DriverToken } from './model/domain';
import { DriversSecurityUtils } from '../drivers/lib/drivers-security.utils';
import { SuperDispatchService } from '../super-dispatch/super-dispatch.service';

@Injectable()
export class DriversAuthService {
  constructor(
    private readonly superDispatchService: SuperDispatchService,
    private readonly driversService: DriversService,
    private readonly jwtService: JwtService
  ) {}

  public async validateDriver({
    email,
    password
  }: {
    email: string;
    password: string;
  }): Promise<DriverEntity> {
    const driverDto = await this.driversService.getUnsafeDriver(email);

    if (!driverDto) {
      throw new UnauthorizedException(`Driver with email - ${email} missing!`);
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      driverDto.passwordHash
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        `Driver with email - ${email} password is incorrect!`
      );
    }

    return DriversSecurityUtils.driverDtoToEntity(driverDto);
  }

  public async getDriverByIdOrEmail(
    arg: number | string
  ): Promise<DriverEntity> {
    const driver = await this.driversService.getDriverEntityByIdOrEmail(arg);

    if (!driver) {
      throw new NotFoundException(`Driver with arg ${arg} not found`);
    }

    return driver;
  }

  public async createDriver({
    email,
    password
  }: {
    email: string;
    password: string;
  }): Promise<DriverEntity> {
    const currentDriver =
      await this.driversService.getDriverEntityByIdOrEmail(email);

    if (currentDriver) {
      throw new BadRequestException('Email already exists');
    }
    const dispatchDriver = await this.superDispatchService.getDriverInfo(email);

    if (!dispatchDriver) {
      throw new UnauthorizedException(
        `Driver with email - ${email} is not registered in SuperDispatch`
      );
    }

    const { truck_capacity, ...rest } = dispatchDriver;

    const driverDto: DriverDto = {
      passwordHash: await PasswordUtils.hashPassword(password),
      ...rest
    };

    if (truck_capacity) {
      driverDto.truckCapacity = truck_capacity;
    }

    return this.driversService.createDriver(driverDto);
  }

  public async createToken(payload: {
    id: number;
    email: string;
    status: string;
  }): Promise<DriverToken> {
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      //TODO: создать логику рефреша. Сохранять, валидировать, заменять, старый удалять.
      refreshToken: crypto.randomUUID(),
      expiredAt: Date.now() + tokenLifeTime * 1000
    };
  }
}
