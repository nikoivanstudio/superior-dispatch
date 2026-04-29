import { Injectable } from '@nestjs/common';
import { DbService } from '../../../../db/db.service';
import {
  CreateNotificationsDto,
  NotificationsDomain,
  NotificationsEntity,
  UpdateNotificationsDto
} from '../../carrier-settings/model/dto/notifications.domain';
import { objectUtils } from '../../../../../common/lib/object.utils';

@Injectable()
export class NotificationsRepository {
  constructor(private readonly dbService: DbService) {}

  public async getNotifications(
    userId: number
  ): Promise<NotificationsEntity | null> {
    const result = await this.dbService.notifications.findUnique({
      where: { userId }
    });

    return result ? objectUtils.removeNullProperties(result) : null;
  }

  public async createNotifications(
    notifications: CreateNotificationsDto
  ): Promise<NotificationsEntity> {
    return objectUtils.removeNullProperties(
      await this.dbService.notifications.create({ data: notifications })
    );
  }

  public async upsertNotifications(
    notifications: CreateNotificationsDto
  ): Promise<NotificationsEntity> {
    const { userId, ...data } = notifications;

    return objectUtils.removeNullProperties(
      await this.dbService.notifications.upsert({
        where: { userId },
        create: notifications,
        update: data
      })
    );
  }

  public async updateNotifications(
    notifications: Partial<UpdateNotificationsDto> & { userId: number }
  ): Promise<NotificationsEntity> {
    return objectUtils.removeNullProperties(
      await this.dbService.notifications.update({
        where: { userId: notifications.userId },
        data: notifications
      })
    );
  }

  public deleteNotifications(userId: number): Promise<NotificationsDomain> {
    return this.dbService.notifications.delete({ where: { userId } });
  }
}
