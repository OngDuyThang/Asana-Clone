import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardsRepository } from './boards.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [BoardsController],
  providers: [BoardsService, BoardsRepository],
  exports: [BoardsService, BoardsRepository],
})
export class BoardsModule {}
