import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';
import { Role } from 'src/utils/constants';
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    @IsUUID(4)
    id: string;

    @Column({ unique: true })
    @IsString()
    @IsNotEmpty()
    @Matches(/^[A-Za-z][A-Za-z0-9_]{3,29}$/, {
        message:
            'Username must start with alphabet, at least 4 characters and maximum 30 characters',
    })
    username: string;

    @Column({ select: false })
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:
            'Password must contain at least 1 upper case letter, at least 1 lower case letter and at least 1 number or special character.',
    })
    password?: string;

    @Column({ unique: true, nullable: true })
    @IsEmail({}, { message: 'Invalid email' })
    @IsNotEmpty()
    email?: string;

    @Column({ nullable: true })
    @IsString()
    @IsOptional()
    avatar?: string;

    @Column({ default: Role.user, select: false })
    @IsEnum(Role)
    @IsOptional()
    role?: Role;

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
