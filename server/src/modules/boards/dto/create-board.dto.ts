import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TBoardType } from '../boards.constant';
import { Trim } from 'src/utils/decorators';
import { UserEntity } from 'src/modules/auth/user.entity';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(250)
  @Trim()
  title: string;

  @IsString()
  @MaxLength(500)
  @IsOptional()
  @Trim()
  description?: string;

  @IsEnum(TBoardType)
  type: TBoardType;

  @IsArray()
  @ArrayMinSize(0)
  // @ValidateNested({ each: true })
  // @Type(() => UserEntity)
  owners: UserEntity[];

  @IsArray()
  @ArrayMinSize(0)
  // @ValidateNested({ each: true })
  // @Type(() => UserEntity)
  members: UserEntity[];
}
