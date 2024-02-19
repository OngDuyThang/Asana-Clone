import { Module } from '@nestjs/common';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { ColumnsRepository } from './columns.repository';
import { AuthModule } from '../auth/auth.module';
import { BoardsModule } from '../boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from '../cards/card.entity';

@Module({
  imports: [AuthModule, BoardsModule, TypeOrmModule.forFeature([CardEntity])],
  controllers: [ColumnsController],
  providers: [ColumnsService, ColumnsRepository],
  exports: [ColumnsService, ColumnsRepository],
})
export class ColumnsModule {}
