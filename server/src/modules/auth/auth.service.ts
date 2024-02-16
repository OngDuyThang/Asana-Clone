import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { CredentialSigninDTO, CredentialSignupDTO } from './dto/credential.dto';
import { JwtPayload } from './auth.types';
import * as bcrypt from 'bcrypt'
import { throwException } from 'src/utils/exceptions';
import { SigninResponseDto } from './dto/signin.dto';
import { Request, Response } from 'express';
import { Env } from 'src/config/env/env.service';

@Injectable()
export class AuthService {
    constructor(
        private usersRepository: UsersRepository,
        private jwtService: JwtService,
        private env: Env
    ) {}

    async signUp(credential: CredentialSignupDTO): Promise<void> {
        return this.usersRepository.createUser(credential)
    }

    async signIn(
        credential: CredentialSigninDTO,
        res: Response
    ): Promise<SigninResponseDto> {
        try {
            const { username, password } = credential
            const user = await this.usersRepository.findOne({
                where: {
                    username
                },
                select: ['password']
            })
            if (!user) throw new NotFoundException('Please check your credential')
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) throw new NotFoundException('Please check your credential')

            const payload: JwtPayload = { username: user.username }
            const refreshToken = this.jwtService.sign(payload, {
                secret: this.env.JWT_SECRET_REFRESH,
                expiresIn: '1d'
            })
            res.cookie(
                'jwt',
                refreshToken,
                {
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true,
                    maxAge: 24 * 60 * 60 * 1000
                }
            );
            return {
                username: user.username,
                avatar: '',
                email: user.email,
                accessToken: this.jwtService.sign(payload),
            }
        } catch (e) {
            throwException(e)
        }
    }

    async refresh(
        req: Request
    ): Promise<string> {
        const refreshToken = req.cookies?.jwt
        if (refreshToken) {
            try {
                const { username, exp } = this.jwtService.verify(
                    refreshToken, { secret: this.env.JWT_SECRET_REFRESH }
                )
                if (Date.now() >= (exp * 1000)) {
                    throw new UnauthorizedException()
                }

                const payload: JwtPayload = {
                    username
                }
                return this.jwtService.sign(payload)
            } catch (e) {
                throw new InternalServerErrorException(e.message)
            }
        }
        throw new UnauthorizedException()
    }
}