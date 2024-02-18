import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { CredentialSignupDTO } from "./dto/credential.dto";
import * as bcrypt from 'bcrypt'
import { UploadService } from "../upload/upload.service";

@Injectable()
export class UsersRepository extends Repository<UserEntity> {
    constructor(
        private dataSource: DataSource,
        private uploadService: UploadService
    ) {
        super(UserEntity, dataSource.createEntityManager())
    }

    async createUser(
        credential: CredentialSignupDTO,
        avatar: Express.Multer.File
    ): Promise<void> {
        const { password } = credential
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt)
        const location = avatar ? await this.uploadService.uploadFile(
            avatar.originalname,
            avatar.mimetype,
            avatar.buffer
        ) : ''

        try {
            const user = this.create({
                ...credential,
                password: hashedPassword,
                avatar: location
            })
            await this.save(user)
        } catch (e) {
            if (e.code === '23505') {
                throw new ConflictException('Username or Email already exists')
            }
            throw new InternalServerErrorException(e.message)
        }
    }
}