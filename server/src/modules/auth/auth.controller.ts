import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialSigninDTO, CredentialSignupDTO } from './dto/credential.dto';
import { SigninResponseDto } from './dto/signin.dto';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @UseInterceptors(FileInterceptor('avatar'))
  async signUp(
    @Body() credential: CredentialSignupDTO,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 50 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
        fileIsRequired: false,
      }),
    )
    avatar?: Express.Multer.File,
  ): Promise<void> {
    return this.authService.signUp(credential, avatar);
  }

  @Post('/signin')
  async signIn(
    @Body() credential: CredentialSigninDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<SigninResponseDto> {
    return this.authService.signIn(credential, res);
  }

  @Post('/refresh')
  async refresh(@Req() req: Request): Promise<string> {
    return this.authService.refresh(req);
  }
}
