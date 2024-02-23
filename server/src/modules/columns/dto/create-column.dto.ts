import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Trim } from 'src/utils/decorators';

export class CreateColumnDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(250)
  @Trim()
  title: string;

  @IsUUID(4)
  @IsNotEmpty()
  boardId: string;
}
