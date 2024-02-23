import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ColumnEntity } from '../columns/columns.entity';
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
import { UserEntity } from '../auth/user.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'card' })
export class CardEntity {
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

  @Column({ nullable: true, type: 'text' })
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  @IsOptional()
  @Trim()
  description?: string;

  @Column({ nullable: true, type: 'text' })
  @IsString()
  @IsOptional()
  cover?: string;

  @ManyToOne((_type) => ColumnEntity, (column) => column.cards, {
    eager: false,
  })
  @Exclude({ toPlainOnly: true })
  @JoinColumn({ name: 'columnId' })
  column: ColumnEntity;

  @Column({ nullable: false, type: 'uuid' })
  @IsUUID(4)
  columnId: string;

  @Column({ nullable: false, type: 'uuid' })
  @IsUUID(4)
  boardId: string;

  @ManyToMany((_type) => UserEntity, (user) => user)
  @JoinTable()
  members?: UserEntity[];

  @Column({ type: 'uuid', array: true, default: [] })
  @IsArray()
  @IsUUID(4, { each: true })
  memberIds?: string[];

  @Column({ type: 'varchar', length: '150', array: true, default: [] })
  comments?: string[];

  @Column({ type: 'varchar', length: '150', array: true, default: [] })
  attachments?: string[];

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
