import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { EnvModule } from './env/env.module';
import { Env } from './env/env.service';
import * as redisStore from 'cache-manager-redis-store';

// CacheModule.register({
//   ttl: 5000, // milisecond
//   max: 10,
// })

export const redisConfig: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [EnvModule],
  inject: [Env],
  useFactory: async (env: Env) => ({
    store: redisStore,
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    username: env.REDIS_USERNAME,
    password: env.REDIS_PASSWORD,
    no_ready_check: true,
    ttl: 60, // second,
  }),
};
