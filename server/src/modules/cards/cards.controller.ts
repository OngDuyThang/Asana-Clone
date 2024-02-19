import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { CardEntity } from './card.entity';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('cards')
@UseGuards(AuthGuard())
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('cover'))
  async createCard(
    @Body() createCardDto: CreateCardDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 50 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
        fileIsRequired: false,
      }),
    )
    cover?: Express.Multer.File, // EQUAL TO req.files
  ): Promise<CardEntity> {
    return this.cardsService.createCard(createCardDto, cover);
  }
}
