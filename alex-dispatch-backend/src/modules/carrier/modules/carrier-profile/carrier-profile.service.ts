import { Injectable } from '@nestjs/common';
import { UsersService } from '../../../users/users.service';
import { CarrierInfoRepository } from './repositories/carrier-info.repository';
import {
  CarrierInfoEntity,
  CreateCarrierInfoDto
} from './model/dto/carrier-info.domain';
import { PModeInfoRepository } from './repositories/p-mode-info.repository';
import {
  CreatePModeInfoDto,
  PModeInfoEntity
} from './model/dto/p-mode-info.domain';
import { SuperDispatchInfoRepository } from './repositories/super-dispatch-info.repository';
import {
  CreateSuperDispatchInfoDto,
  SuperDispatchInfoEntity
} from './model/dto/super-dispatch-info.domain';

@Injectable()
export class CarrierProfileService {
  constructor(
    private readonly usersService: UsersService,
    private readonly carrierInfoRepository: CarrierInfoRepository,
    private readonly pModeInfoRepository: PModeInfoRepository,
    private readonly superDispatchInfoRepository: SuperDispatchInfoRepository
  ) {}

  public addTerminal() {}

  public async getUserCarrierInfo(
    userId: number
  ): Promise<CarrierInfoEntity | null> {
    return this.carrierInfoRepository.getCarrierInfo(userId);
  }

  public async upsertCarrierInfo(
    dto: CreateCarrierInfoDto
  ): Promise<CarrierInfoEntity> {
    return this.carrierInfoRepository.upsertCarrierInfo(dto);
  }

  public async getUserPModeInfo(
    userId: number
  ): Promise<PModeInfoEntity | null> {
    return this.pModeInfoRepository.getPModeInfo(userId);
  }

  public async upsertPModeInfo(
    dto: CreatePModeInfoDto
  ): Promise<PModeInfoEntity> {
    return this.pModeInfoRepository.upsertPModeInfo(dto);
  }

  public async getUserSuperDispatchInfo(
    userId: number
  ): Promise<SuperDispatchInfoEntity | null> {
    return this.superDispatchInfoRepository.getSuperDispatchInfo(userId);
  }

  public async upsertSuperDispatchInfo(
    dto: CreateSuperDispatchInfoDto
  ): Promise<SuperDispatchInfoEntity> {
    return this.superDispatchInfoRepository.upsertSuperDispatchInfo(dto);
  }
}
