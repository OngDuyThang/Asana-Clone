import { Injectable } from '@nestjs/common';
import { ColumnsRepository } from './columns.repository';
import { CreateColumnDto } from './dto/create-column.dto';
import { ColumnEntity } from './columns.entity';
import { UserEntity } from '../auth/user.entity';
import { BoardsRepository } from '../boards/boards.repository';
import { MoveCardDto } from './dto/move-card.dto';

@Injectable()
export class ColumnsService {
  constructor(
    private columnsRepository: ColumnsRepository,
    private boardsRepository: BoardsRepository,
  ) {}

  async createColumn(
    createColumnDto: CreateColumnDto,
    user: UserEntity,
  ): Promise<ColumnEntity> {
    return this.columnsRepository.createColumn(createColumnDto, user);
  }

  async deleteColumn(id: string): Promise<void> {
    this.columnsRepository.deleteColumn(id);
  }

  async moveCard(moveCardDto: MoveCardDto): Promise<void> {
    return this.columnsRepository.moveCard(moveCardDto);
  }
}
