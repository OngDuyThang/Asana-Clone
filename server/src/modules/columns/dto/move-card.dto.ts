import { IsArray, IsUUID } from 'class-validator';

export class MoveCardDto {
  @IsUUID(4, { each: true })
  currentId: string;

  @IsUUID(4, { each: true })
  prevId: string;

  @IsUUID(4, { each: true })
  cardId: string;

  @IsArray()
  @IsUUID(4, { each: true })
  currentCardOrderIds: string[];

  @IsArray()
  @IsUUID(4, { each: true })
  prevCardOrderIds: string[];
}
