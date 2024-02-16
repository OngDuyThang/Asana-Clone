import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialSigninDTO, CredentialSignupDTO } from './dto/credential.dto';
import { SigninResponseDto } from './dto/signin.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('/signup')
    async signUp(
        @Body() credential: CredentialSignupDTO
    ): Promise<void> {
        return this.authService.signUp(credential)
    }

    @Post('/signin')
    async signIn(
        @Body() credential: CredentialSigninDTO,
        @Res({ passthrough: true }) res: Response
    ): Promise<SigninResponseDto> {
        return this.authService.signIn(credential, res)
    }

    @Post('/refresh')
    async refresh(
        @Req() req: Request,
    ): Promise<string> {
        return this.authService.refresh(req)
    }
}
