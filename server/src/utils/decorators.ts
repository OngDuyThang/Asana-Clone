import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Transform, TransformFnParams } from 'class-transformer';

export function Trim(): (target: any, key: string) => void {
  return Transform(({ value }: TransformFnParams) => {
    return typeof value === 'string' ? value.trim() : value;
  });
}

export const GetUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
