import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { CardsRepository } from './cards.repository';
import { AuthModule } from '../auth/auth.module';
import { ColumnsModule } from '../columns/columns.module';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [AuthModule, ColumnsModule, UploadModule],
  controllers: [CardsController],
  providers: [CardsService, CardsRepository],
})
export class CardsModule {}
