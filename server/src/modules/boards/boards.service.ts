import { Injectable } from '@nestjs/common';
import { BoardsRepository } from './boards.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardEntity } from './board.entity';
import { UserEntity } from '../auth/user.entity';
import { MoveColumnDto } from './dto/move-column.dto';
import { GetBoardsResDto } from './dto/get-boards-res.dto';

@Injectable()
export class BoardsService {
  constructor(private boardsRepository: BoardsRepository) {}

  async getBoards(user: UserEntity): Promise<GetBoardsResDto[]> {
    return this.boardsRepository.getBoards(user);
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: UserEntity,
  ): Promise<BoardEntity> {
    return this.boardsRepository.createBoard(createBoardDto, user);
  }

  async getBoardById(id: string, user: UserEntity): Promise<BoardEntity> {
    return this.boardsRepository.getBoardById(id, user);
  }

  async deleteBoardById(id: string, user: UserEntity): Promise<void> {
    return this.boardsRepository.deleteBoardById(id, user);
  }

  async moveColumn(
    id: string,
    user: UserEntity,
    moveColumnDto: MoveColumnDto,
  ): Promise<void> {
    return this.boardsRepository.moveColumn(id, user, moveColumnDto);
  }
}
