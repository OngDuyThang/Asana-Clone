import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Env } from "./env.service";

@Module({
    imports: [ConfigModule],
    providers: [Env],
    exports: [Env]
})
export class EnvModule {}