import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ArrayContains, DataSource, Repository } from "typeorm";
import { BoardEntity } from "./board.entity";
import { CreateBoardDto } from "./dto/create-board.dto";
import { kebabCase } from 'lodash'
import { UserEntity } from "../auth/user.entity";
import { excludeColumns } from "src/utils/db";
import { throwException } from "src/utils/exceptions";
import { MoveColumnDto } from "./dto/move-column.dto";

@Injectable()
export class BoardsRepository extends Repository<BoardEntity>{
    constructor(private dataSource: DataSource) {
        super(BoardEntity, dataSource.createEntityManager())
    }

    async getBoards(
        user: UserEntity
    ): Promise<BoardEntity[]> {
        try {
            const boards = await this.find({
                where: [
                    { ownerIds: ArrayContains([user.id]) },
                    { memberIds: ArrayContains([user.id]) }
                ]
            })
            return boards
        } catch (e) {
            throw new InternalServerErrorException(e.message)
        }
    }

    async createBoard(
        createBoardDto: CreateBoardDto,
        user: UserEntity
    ): Promise<BoardEntity> {
        try {
            const board = this.create({
                ...createBoardDto,
                slug: kebabCase(createBoardDto.title),
                owners: [user],
                ownerIds: [user.id]
            })
            await this.save(board)
            return board
        } catch (e) {
            throw new InternalServerErrorException(e.message)
        }
    }

    async getBoardById(
        id: string,
        user: UserEntity
    ): Promise<BoardEntity> {
        try {
            const board = await this.findOne({
                where: [
                    { id, ownerIds: ArrayContains([user.id]) },
                    { id, memberIds: ArrayContains([user.id]) }
                ],
                relations: ['columns', 'owners'],
            })
            if (!board) throw new NotFoundException()
            return board
        } catch (e) {
            throwException(e)
        }
    }

    async patchColumnOrder(
        boardId: string,
        user: UserEntity,
        columnId: string
    ): Promise<void> {
        try {
            const board = await this.getBoardById(boardId, user)
            board.columnOrderIds.push(columnId)
            await this.save(board)
        } catch (e) {
            throwException(e)
        }
    }

    async deleteBoardById(
        id: string,
        user: UserEntity
    ): Promise<void> {
        try {
            const res = await this.delete({ id, ownerIds: ArrayContains([user.id]) })
            if (!res.affected) throw new NotFoundException()
        } catch (e) {
            throwException(e)
        }
    }

    async moveColumn(
        id: string,
        user: UserEntity,
        moveColumnDto: MoveColumnDto
    ): Promise<void> {
        try {
            const board = await this.getBoardById(id, user)
            board.columnOrderIds = moveColumnDto.columnOrderIds
            await this.save(board)
        } catch (e) {
            throwException(e)
        }
    }
}