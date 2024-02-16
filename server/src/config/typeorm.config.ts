import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm"
import { StageEnum } from "src/utils/constants"
import { BoardEntity } from "src/modules/boards/board.entity"
import { EnvModule } from "./env/env.module"
import { Env } from "./env/env.service"
import { ColumnEntity } from "src/modules/columns/columns.entity"
import { CardEntity } from "src/modules/cards/card.entity"
import { UserEntity } from "src/modules/auth/user.entity"

export const typeormConfig: TypeOrmModuleAsyncOptions = {
    imports: [EnvModule],
    inject: [Env],
    useFactory: async (env: Env) => {
        const isProd = process.env.STAGE === StageEnum.prod
        return {
            ssl: isProd,
            extra: {
                ssl: isProd ? { rejectUnauthorized: false } : null
            },
            type: 'postgres',
            host: env.DB_HOST,
            port: env.DB_PORT,
            username: env.DB_USERNAME,
            password: env.DB_PASSWORD,
            database: env.DB_NAME,
            autoLoadEntities: true,
            synchronize: true,
            entities: [BoardEntity, ColumnEntity, CardEntity, UserEntity]
        }
    }
}