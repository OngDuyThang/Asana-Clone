import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ColumnEntity } from '../columns/columns.entity';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Trim } from 'src/utils/decorators';
import { TBoardType } from './boards.constant';
import { UserEntity } from '../auth/user.entity';

@Entity({ name: 'board' })
export class BoardEntity {
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

  @Column({ nullable: false })
  @IsEnum(TBoardType)
  type: TBoardType;

  @ManyToMany((_type) => UserEntity, (user) => user)
  @JoinTable()
  owners: UserEntity[];

  @Column({ type: 'uuid', array: true, default: [] })
  @IsArray()
  @IsUUID(4, { each: true })
  ownerIds: string[];

  @ManyToMany((_type) => UserEntity, (user) => user)
  @JoinTable()
  members: UserEntity[];

  @Column({ type: 'uuid', array: true, default: [] })
  @IsArray()
  @IsUUID(4, { each: true })
  memberIds: string[];

  @OneToMany((_type) => ColumnEntity, (column) => column.board)
  @IsArray()
  columns: ColumnEntity[];

  @Column({ type: 'uuid', array: true, default: [] })
  @IsArray()
  @IsUUID(4, { each: true })
  columnOrderIds: string[];

  @Column({ nullable: true, type: 'varchar', length: '250' })
  @IsString()
  slug: string;

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
