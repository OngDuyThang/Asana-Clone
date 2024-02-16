import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { ColumnEntity } from './columns.entity';
import { AuthGuard } from '@nestjs/passport';
import { uuidPipe } from 'src/utils/pipes';
import { GetUser } from 'src/utils/decorators';
import { UserEntity } from '../auth/user.entity';
import { MoveCardDto } from './dto/move-card.dto';

@Controller('columns')
@UseGuards(AuthGuard())
export class ColumnsController {
    constructor(
        private columnsService: ColumnsService
    ) {}

    @Post()
    async createColumn(
        @Body() createColumnDto: CreateColumnDto,
        @GetUser() user: UserEntity
    ): Promise<ColumnEntity> {
        return this.columnsService.createColumn(createColumnDto, user)
    }

    @Delete('/:id')
    async deleteColumn(
        @Param('id', uuidPipe) id: string
    ): Promise<void> {
        this.columnsService.deleteColumn(id)
    }

    @Patch()
    async moveCard(
        @Body() moveCardDto: MoveCardDto
    ): Promise<void> {
        return this.columnsService.moveCard(moveCardDto)
    }
}
