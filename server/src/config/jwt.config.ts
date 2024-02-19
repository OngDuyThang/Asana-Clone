import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { EnvModule } from './env/env.module';
import { Env } from './env/env.service';

export const jwtConfig: JwtModuleAsyncOptions = {
  imports: [EnvModule],
  inject: [Env],
  useFactory: async (env: Env) => ({
    secret: env.JWT_SECRET_ACCESS,
    signOptions: { expiresIn: '5h' },
  }),
};
