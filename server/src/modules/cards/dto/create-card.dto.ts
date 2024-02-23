import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserEntity } from 'src/modules/auth/user.entity';
import { Trim } from 'src/utils/decorators';

export class CreateCardDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(250)
  @Trim()
  title: string;

  @IsString()
  @MinLength(1)
  @MaxLength(500)
  @IsOptional()
  @Trim()
  description?: string;

  @IsUUID(4)
  @IsNotEmpty()
  columnId: string;

  @IsUUID(4)
  @IsNotEmpty()
  boardId: string;

  @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => UserEntity)
  members: UserEntity[];

  @IsArray()
  // @IsString({ each: true })
  comments: string[];

  @IsArray()
  // @IsString({ each: true })
  attachments: string[];
}
