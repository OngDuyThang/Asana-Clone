import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "./auth.types";
import { UsersRepository } from "./user.repository";
import { UserEntity } from "./user.entity";
import { Env } from "src/config/env/env.service";
import { throwException } from "src/utils/exceptions";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private usersRepository: UsersRepository,
        private env: Env
    ) {
        super({
            secretOrKey: env.JWT_SECRET_ACCESS,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload: JwtPayload): Promise<UserEntity> {
        if (!Object.keys(payload).length) throw new UnauthorizedException()
        try {
            const { id, username } = payload
            const user = await this.usersRepository.findOne({
                where: {
                    id,
                    username
                }
            })
            if (!user) {
                throw new UnauthorizedException()
            }
            return user
        } catch (e) {
            throwException(e)
        }
    }
}