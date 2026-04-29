import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './modules/db/db.module';
import { AuthModule } from './modules/auth/auth.module';
import { RedisModule } from './modules/redis/redis.module';
import { SuperDispatchModule } from './modules/super-dispatch/super-dispatch.module';
import { DriversModule } from './modules/drivers/drivers.module';
import { DriversAuthModule } from './modules/drivers-auth/drivers-auth.module';
import { UsersModule } from './modules/users/users.module';
import { CarrierModule } from './modules/carrier/carrier.module';

@Module({
  imports: [
    DbModule,
    RedisModule,
    UsersModule,
    AuthModule,
    SuperDispatchModule,
    DriversModule,
    DriversAuthModule,
    CarrierModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
