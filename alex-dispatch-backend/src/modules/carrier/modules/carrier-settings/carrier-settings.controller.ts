import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  UseGuards,
  UsePipes
} from '@nestjs/common';
import { CarrierSettingsService } from './carrier-settings.service';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import type { UserEntity } from '../../../users/model/domain';
import type { CreateDriverAppDto } from './model/dto/driver-app.domain';
import { UpdateDriverAppSettingsPipe } from './pipes/update-driver-app-settings.pipe';
import { ValidateOwnDriverAppSettingsPipe } from './pipes/validate-own-driver-app-settings.pipe';
import type { CreateBillingSettingsDto } from './model/dto/billing-settings.domain';
import { UpdateBillingSettingsPipe } from './pipes/update-billing-settings.pipe';
import type { CreateNotificationsDto } from './model/dto/notifications.domain';

import type { CreateFactoringDto } from './model/dto/factoring.domain';
import { UpdateNotificationsPipe } from './pipes/update-notifications.pipe';
import { UpdateFactoringPipe } from './pipes/update-factoring.pipe';

@UseGuards(AuthGuard('jwt'))
@Controller('carrier/settings')
export class CarrierSettingsController {
  constructor(
    private readonly carrierSettingsService: CarrierSettingsService
  ) {}

  @Get('driver_app')
  public async getUserSettings(@Req() req: Request & { user: UserEntity }) {
    const settings = await this.carrierSettingsService.getUserDriverAppSettings(
      Number(req.user.id)
    );

    if (!settings) {
      throw new NotFoundException('No user settings found');
    }

    return settings;
  }

  @UsePipes(UpdateDriverAppSettingsPipe, ValidateOwnDriverAppSettingsPipe)
  @Post('driver_app')
  public async updateUserSettings(
    @Req() req: Request & { user: UserEntity },
    @Body() dto: CreateDriverAppDto
  ) {
    return this.carrierSettingsService.upsertDriverApp(dto);
  }

  @Get('billing')
  public async getUserBillingSettings(
    @Req() req: Request & { user: UserEntity }
  ) {
    const settings = await this.carrierSettingsService.getUserBillingSettings(
      Number(req.user.id)
    );

    if (!settings) {
      throw new NotFoundException('No user settings found');
    }

    return settings;
  }

  @UsePipes(UpdateBillingSettingsPipe, ValidateOwnDriverAppSettingsPipe)
  @Post('billing')
  public async updateUserBillingSettings(
    @Req() req: Request & { user: UserEntity },
    @Body() dto: CreateBillingSettingsDto
  ) {
    return this.carrierSettingsService.upsertBillingSettings(dto);
  }

  @Get('notifications')
  public async getUserNotifications(
    @Req() req: Request & { user: UserEntity }
  ) {
    const settings = await this.carrierSettingsService.getUserNotifications(
      Number(req.user.id)
    );

    if (!settings) {
      throw new NotFoundException('No user settings found');
    }

    return settings;
  }

  @UsePipes(UpdateNotificationsPipe, ValidateOwnDriverAppSettingsPipe)
  @Post('notifications')
  public async updateUserNotifications(
    @Req() req: Request & { user: UserEntity },
    @Body() dto: CreateNotificationsDto
  ) {
    return this.carrierSettingsService.upsertNotifications(dto);
  }

  @Get('factoring')
  public async getUserFactoring(@Req() req: Request & { user: UserEntity }) {
    const settings = await this.carrierSettingsService.getUserFactoring(
      Number(req.user.id)
    );

    if (!settings) {
      throw new NotFoundException('No user settings found');
    }

    return settings;
  }

  @UsePipes(UpdateFactoringPipe, ValidateOwnDriverAppSettingsPipe)
  @Post('factoring')
  public async updateUserFactoring(
    @Req() req: Request & { user: UserEntity },
    @Body() dto: CreateFactoringDto
  ) {
    return this.carrierSettingsService.upsertFactoring(dto);
  }
}
