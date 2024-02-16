import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersRepository } from './user.repository';
import { JwtStrategy } from './jwt.strategy';
import { EnvModule } from 'src/config/env/env.module';
import { jwtConfig } from 'src/config/jwt.config';

@Module({
  imports: [
    EnvModule,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync(jwtConfig),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersRepository, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
