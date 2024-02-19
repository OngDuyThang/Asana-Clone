import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ColumnEntity } from './columns.entity';
import { CreateColumnDto } from './dto/create-column.dto';
import { throwException } from 'src/utils/exceptions';
import { UserEntity } from '../auth/user.entity';
import { BoardsRepository } from '../boards/boards.repository';
import { MoveCardDto } from './dto/move-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CardEntity } from '../cards/card.entity';

@Injectable()
export class ColumnsRepository extends Repository<ColumnEntity> {
  constructor(
    private dataSource: DataSource,
    private boardsRepository: BoardsRepository,
    @InjectRepository(CardEntity)
    private cardsRepository: Repository<CardEntity>,
  ) {
    super(ColumnEntity, dataSource.createEntityManager());
  }

  async getColumnById(id: string): Promise<ColumnEntity> {
    try {
      const column = await this.findOne({ where: { id } });
      if (!column) {
        throw new NotFoundException();
      }
      return column;
    } catch (e) {
      throwException(e);
    }
  }

  async patchCardOrder(columnId: string, cardId: string): Promise<void> {
    try {
      const column = await this.getColumnById(columnId);
      column.cardOrderIds.push(cardId);
      await this.save(column);
    } catch (e) {
      throwException(e);
    }
  }

  async createColumn(
    createColumnDto: CreateColumnDto,
    user: UserEntity,
  ): Promise<ColumnEntity> {
    try {
      const column = this.create(createColumnDto);
      await this.save(column);
      await this.boardsRepository.patchColumnOrder(
        column.boardId,
        user,
        column.id,
      );
      return {
        ...column,
        cards: [],
      };
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async deleteColumn(id: string): Promise<void> {
    try {
      const res = await this.delete({ id });
      if (!res.affected) {
        throw new NotFoundException();
      }
    } catch (e) {
      throwException(e);
    }
  }

  async patchColumnId(id: string, columnId: string): Promise<void> {
    try {
      const card = await this.cardsRepository.findOne({ where: { id } });
      if (!card) {
        throw new NotFoundException();
      }
      card.columnId = columnId;
      await this.cardsRepository.save(card);
    } catch (e) {
      throwException(e);
    }
  }

  async moveCard(moveCardDto: MoveCardDto): Promise<void> {
    const { currentId, prevId, cardId, currentCardOrderIds, prevCardOrderIds } =
      moveCardDto;
    if (currentId === prevId) {
      try {
        const column = await this.getColumnById(currentId);
        column.cardOrderIds = currentCardOrderIds;
        await this.save(column);
      } catch (e) {
        throwException(e);
      }
    } else {
      try {
        await this.patchColumnId(cardId, currentId);

        const currentColumn = await this.getColumnById(currentId);
        currentColumn.cardOrderIds = currentCardOrderIds;
        await this.save(currentColumn);

        const prevColumn = await this.getColumnById(prevId);
        prevColumn.cardOrderIds = prevCardOrderIds;
        await this.save(prevColumn);
      } catch (e) {
        throwException(e);
      }
    }
  }
}
