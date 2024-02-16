import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { CardEntity } from "./card.entity";
import { CreateCardDto } from "./dto/create-card.dto";
import { ColumnsRepository } from "../columns/columns.repository";
import { UploadService } from "../upload/upload.service";
import { throwException } from "src/utils/exceptions";

@Injectable()
export class CardsRepository extends Repository<CardEntity> {
    constructor(
        private dataSource: DataSource,
        private columnsRepository: ColumnsRepository,
        private uploadService: UploadService
    ) {
        super(CardEntity, dataSource.createEntityManager())
    }

    // async getCardById(
    //     id: string
    // ): Promise<CardEntity> {
    //     try {
    //         const card = this.findOne(({ where: { id } }))
    //         if (!card) {
    //             throw new NotFoundException()
    //         }
    //         return card
    //     } catch (e) {
    //         throwException(e)
    //     }
    // }

    async createCard(
        createCardDto: CreateCardDto,
        cover: Express.Multer.File
    ): Promise<CardEntity> {
        try {
            const location = cover ? await this.uploadService.uploadFile(
                cover.originalname,
                cover.mimetype,
                cover.buffer
            ) : ''
            const card = this.create({
                ...createCardDto,
                cover: location
            })
            await this.save(card)
            await this.columnsRepository.patchCardOrder(
                card.columnId,
                card.id
            )
            return card
        } catch (e) {
            throw new InternalServerErrorException(e.message)
        }
    }

    // async patchColumnId(
    //     id: string,
    //     columnId: string
    // ): Promise<void> {
    //     try {
    //         const card = await this.getCardById(id)
    //         card.columnId = columnId
    //         await this.save(card)
    //     } catch (e) {
    //         throwException(e)
    //     }
    // }
}