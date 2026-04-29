import { Injectable } from '@nestjs/common';
import { UsersService } from '../../../users/users.service';
import { DriverAppRepository } from './repositories/driver-app.repository';
import {
  CreateDriverAppDto,
  DriverAppEntity
} from './model/dto/driver-app.domain';

import {
  BillingSettingsEntity,
  CreateBillingSettingsDto
} from './model/dto/billing-settings.domain';

import {
  CreateNotificationsDto,
  NotificationsEntity
} from './model/dto/notifications.domain';
import { FactoringRepository } from './repositories/factoring.repository';
import {
  CreateFactoringDto,
  FactoringEntity
} from './model/dto/factoring.domain';
import { NotificationsRepository } from './repositories/notifications.repository';
import { BillingSettingsRepository } from './repositories/billing-settings.repository';

@Injectable()
export class CarrierSettingsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly driverAppRepository: DriverAppRepository,
    private readonly billingSettingsRepository: BillingSettingsRepository,
    private readonly notificationsRepository: NotificationsRepository,
    private readonly factoringRepository: FactoringRepository
  ) {}

  public addTerminal() {}

  public async getUserDriverAppSettings(
    userId: number
  ): Promise<DriverAppEntity | null> {
    return this.driverAppRepository.getDriverAppSettings(userId);
  }

  public async upsertDriverApp(
    dto: CreateDriverAppDto
  ): Promise<DriverAppEntity> {
    return this.driverAppRepository.upsertDriverAppSettings(dto);
  }

  public async getUserBillingSettings(
    userId: number
  ): Promise<BillingSettingsEntity | null> {
    return this.billingSettingsRepository.getBillingSettings(userId);
  }

  public async upsertBillingSettings(
    dto: CreateBillingSettingsDto
  ): Promise<BillingSettingsEntity> {
    return this.billingSettingsRepository.upsertBillingSettings(dto);
  }

  public async getUserNotifications(
    userId: number
  ): Promise<NotificationsEntity | null> {
    return this.notificationsRepository.getNotifications(userId);
  }

  public async upsertNotifications(
    dto: CreateNotificationsDto
  ): Promise<NotificationsEntity> {
    return this.notificationsRepository.upsertNotifications(dto);
  }

  public async getUserFactoring(
    userId: number
  ): Promise<FactoringEntity | null> {
    return this.factoringRepository.getFactoring(userId);
  }

  public async upsertFactoring(
    dto: CreateFactoringDto
  ): Promise<FactoringEntity> {
    return this.factoringRepository.upsertFactoring(dto);
  }
}
