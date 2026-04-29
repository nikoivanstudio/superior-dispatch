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
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import type { UserEntity } from '../../../users/model/domain';
import { CarrierProfileService } from './carrier-profile.service';
import type { CreateCarrierInfoDto } from './model/dto/carrier-info.domain';
import { UpdateCarrierInfoPipe } from './pipes/update-carrier-info.pipe';
import { ValidateOwnCarrierProfilePipe } from './pipes/validate-own-carrier-profile.pipe';
import type { CreatePModeInfoDto } from './model/dto/p-mode-info.domain';
import { UpdatePModeInfoPipe } from './pipes/update-p-mode-info.pipe';
import type { CreateSuperDispatchInfoDto } from './model/dto/super-dispatch-info.domain';
import { UpdateSuperDispatchInfoPipe } from './pipes/update-super-dispatch-info.pipe';

@UseGuards(AuthGuard('jwt'))
@Controller('carrier/profile')
export class CarrierProfileController {
  constructor(private readonly carrierProfileService: CarrierProfileService) {}

  @Get('carrier_info')
  public async getUserCarrierInfo(@Req() req: Request & { user: UserEntity }) {
    const settings = await this.carrierProfileService.getUserCarrierInfo(
      Number(req.user.id)
    );

    if (!settings) {
      throw new NotFoundException('No user settings found');
    }

    return settings;
  }

  @UsePipes(UpdateCarrierInfoPipe, ValidateOwnCarrierProfilePipe)
  @Post('carrier_info')
  public async updateUserCarrierInfo(
    @Req() req: Request & { user: UserEntity },
    @Body() dto: CreateCarrierInfoDto
  ) {
    return this.carrierProfileService.upsertCarrierInfo(dto);
  }

  @Get('p_mode_info')
  public async getUserPModeInfo(@Req() req: Request & { user: UserEntity }) {
    const settings = await this.carrierProfileService.getUserPModeInfo(
      Number(req.user.id)
    );

    if (!settings) {
      throw new NotFoundException('No user settings found');
    }

    return settings;
  }

  @UsePipes(UpdatePModeInfoPipe, ValidateOwnCarrierProfilePipe)
  @Post('p_mode_info')
  public async updateUserPModeInfo(
    @Req() req: Request & { user: UserEntity },
    @Body() dto: CreatePModeInfoDto
  ) {
    return this.carrierProfileService.upsertPModeInfo(dto);
  }

  @Get('super_dispatch_info')
  public async getUserSuperDispatchInfo(
    @Req() req: Request & { user: UserEntity }
  ) {
    const settings = await this.carrierProfileService.getUserSuperDispatchInfo(
      Number(req.user.id)
    );

    if (!settings) {
      throw new NotFoundException('No user settings found');
    }

    return settings;
  }

  @UsePipes(UpdateSuperDispatchInfoPipe, ValidateOwnCarrierProfilePipe)
  @Post('super_dispatch_info')
  public async updateUserSuperDispatchInfo(
    @Req() req: Request & { user: UserEntity },
    @Body() dto: CreateSuperDispatchInfoDto
  ) {
    return this.carrierProfileService.upsertSuperDispatchInfo(dto);
  }
}
