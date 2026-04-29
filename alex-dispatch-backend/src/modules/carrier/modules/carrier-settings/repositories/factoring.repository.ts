import { Injectable } from '@nestjs/common';
import { DbService } from '../../../../db/db.service';
import {
  CreateFactoringDto,
  FactoringDomain,
  FactoringEntity,
  UpdateFactoringDto
} from '../model/dto/factoring.domain';
import { objectUtils } from '../../../../../common/lib/object.utils';

@Injectable()
export class FactoringRepository {
  constructor(private readonly dbService: DbService) {}

  public async getFactoring(userId: number): Promise<FactoringEntity | null> {
    const result = await this.dbService.factoring.findUnique({
      where: { userId }
    });

    return result ? objectUtils.removeNullProperties(result) : null;
  }

  public async createFactoring(
    factoring: CreateFactoringDto
  ): Promise<FactoringEntity> {
    return objectUtils.removeNullProperties(
      await this.dbService.factoring.create({ data: factoring })
    );
  }

  public async upsertFactoring(
    factoring: CreateFactoringDto
  ): Promise<FactoringEntity> {
    const { userId, ...data } = factoring;

    return objectUtils.removeNullProperties(
      await this.dbService.factoring.upsert({
        where: { userId },
        create: factoring,
        update: data
      })
    );
  }

  public async updateFactoring(
    factoring: Partial<UpdateFactoringDto> & { userId: number }
  ): Promise<FactoringEntity> {
    return objectUtils.removeNullProperties(
      await this.dbService.factoring.update({
        where: { userId: factoring.userId },
        data: factoring
      })
    );
  }

  public deleteFactoring(userId: number): Promise<FactoringDomain> {
    return this.dbService.factoring.delete({ where: { userId } });
  }
}
