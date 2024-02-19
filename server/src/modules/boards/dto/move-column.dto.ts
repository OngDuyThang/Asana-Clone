import { IsArray, IsUUID } from 'class-validator';

export class MoveColumnDto {
  @IsArray()
  @IsUUID(4, { each: true })
  columnOrderIds: string[];
}
