import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { StageEnum } from './utils/constants';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger();

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const exceptionStatus = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const stack = exception.stack;

    this.logger.error(`${req.method} ${req.url} ${exception.message}`);
    res.status(exceptionStatus).json(
      process.env.STAGE !== StageEnum.prod
        ? {
            ...(exceptionResponse as object),
            stack,
          }
        : exceptionResponse,
    );
  }
}
