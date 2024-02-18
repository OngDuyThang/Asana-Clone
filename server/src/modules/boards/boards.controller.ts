import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardEntity } from './board.entity';
import { uuidPipe } from 'src/utils/pipes';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/utils/decorators';
import { UserEntity } from '../auth/user.entity';
import { MoveColumnDto } from './dto/move-column.dto';
import { GetBoardsResDto } from './dto/get-boards-res.dto';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    constructor(
        private boardService: BoardsService
    ) {}

    @Get()
    async getBoards(
        @GetUser() user: UserEntity
    ): Promise<GetBoardsResDto[]> {
        return this.boardService.getBoards(user)
    }

    @Post()
    async createBoard(
        @Body() createBoardDto: CreateBoardDto,
        @GetUser() user: UserEntity
    ): Promise<BoardEntity> {
        return this.boardService.createBoard(
            createBoardDto,
            user
        )
    }

    @Get('/:id')
    async getBoardById(
        @Param('id', uuidPipe) id: string,
        @GetUser() user: UserEntity
    ): Promise<BoardEntity> {
        return this.boardService.getBoardById(id, user)
    }

    @Delete('/:id')
    async deleteBoardById(
        @Param('id', uuidPipe) id: string,
        @GetUser() user: UserEntity
    ): Promise<void> {
        return this.boardService.deleteBoardById(id, user)
    }

    @Patch('/:id')
    async moveColumn(
        @Param('id', uuidPipe) id: string,
        @GetUser() user: UserEntity,
        @Body() moveColumnDto: MoveColumnDto
    ): Promise<void> {
        return this.boardService.moveColumn(id, user, moveColumnDto)
    }
}
