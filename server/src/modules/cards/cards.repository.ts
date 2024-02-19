import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { CardEntity } from "./card.entity";
import { CreateCardDto } from "./dto/create-card.dto";
import { ColumnsRepository } from "../columns/columns.repository";
import { UploadService } from "../upload/upload.service";

@Injectable()
export class CardsRepository extends Repository<CardEntity> {
    constructor(
        private dataSource: DataSource,
        private columnsRepository: ColumnsRepository,
        private uploadService: UploadService
    ) {
        super(CardEntity, dataSource.createEntityManager())
    }

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
}