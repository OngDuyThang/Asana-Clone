import { Inject, Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { validationConfigSchema } from './validations/config.schema';
import { EnvModule } from './config/env/env.module';
import { BoardsModule } from './modules/boards/boards.module';
import { CardsModule } from './modules/cards/cards.module';
import { ColumnsModule } from './modules/columns/columns.module';
import { AuthModule } from './modules/auth/auth.module';
import { UploadModule } from './modules/upload/upload.module';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { redisConfig } from './config/redis.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: validationConfigSchema,
    }),
    TypeOrmModule.forRootAsync(typeormConfig),
    EnvModule,
    CacheModule.registerAsync(redisConfig),
    BoardsModule,
    CardsModule,
    ColumnsModule,
    AuthModule,
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  logger = new Logger();
  constructor(@Inject(CACHE_MANAGER) cacheManager) {
    const client = cacheManager.store.getClient();

    client.on('error', (error) => {
      this.logger.error(error);
    });
  }
}
