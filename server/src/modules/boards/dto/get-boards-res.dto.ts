import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Trim } from 'src/utils/decorators';

export class GetBoardsResDto {
  @IsUUID(4)
  id: string;

  @IsString()
  @IsNotEmpty()
  @Trim()
  title: string;
}
