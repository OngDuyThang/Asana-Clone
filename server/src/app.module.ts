import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: validationConfigSchema
    }),
    TypeOrmModule.forRootAsync(typeormConfig),
    EnvModule,
    BoardsModule,
    CardsModule,
    ColumnsModule,
    AuthModule,
    UploadModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
