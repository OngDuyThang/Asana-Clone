import { Injectable } from '@nestjs/common';
import { CardsRepository } from './cards.repository';
import { CreateCardDto } from './dto/create-card.dto';
import { CardEntity } from './card.entity';

@Injectable()
export class CardsService {
    constructor(
        private cardsRepository: CardsRepository,
    ) {}

    async createCard(
        createCardDto: CreateCardDto,
        cover: Express.Multer.File
    ): Promise<CardEntity> {
        return this.cardsRepository.createCard(
            createCardDto,
            cover
        )
    }
}
