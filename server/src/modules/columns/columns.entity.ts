import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BoardEntity } from '../boards/board.entity';
import { CardEntity } from '../cards/card.entity';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Trim } from 'src/utils/decorators';
import { Exclude } from 'class-transformer';

@Entity({ name: 'column' })
export class ColumnEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID(4)
  id: string;

  @Column({ nullable: false, type: 'varchar', length: '250' })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(250)
  @Trim()
  title: string;

  @ManyToOne((_type) => BoardEntity, (board) => board.columns)
  @Exclude({ toPlainOnly: true })
  @JoinColumn({ name: 'boardId' })
  board: BoardEntity;

  @Column({ nullable: false, type: 'uuid' })
  @IsUUID()
  boardId: string;

  @OneToMany((_type) => CardEntity, (card) => card.column, { eager: true })
  @IsArray()
  cards: CardEntity[];

  @Column({ type: 'uuid', array: true, default: [] })
  @IsArray()
  @IsUUID(4, { each: true })
  cardOrderIds: string[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    select: false,
  })
  @IsOptional()
  public created_at?: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    select: false,
  })
  @IsOptional()
  public updated_at?: Date;
}
