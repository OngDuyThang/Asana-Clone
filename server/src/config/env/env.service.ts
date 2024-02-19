import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Env {
  constructor(private configService: ConfigService) {}

  get PORT() {
    return this.configService.get('PORT');
  }

  get DB_HOST() {
    return this.configService.get('DB_HOST');
  }

  get DB_PORT() {
    return this.configService.get('DB_PORT');
  }

  get DB_USERNAME() {
    return this.configService.get('DB_USERNAME');
  }

  get DB_PASSWORD() {
    return this.configService.get('DB_PASSWORD');
  }

  get DB_NAME() {
    return this.configService.get('DB_NAME');
  }

  get JWT_SECRET_ACCESS() {
    return this.configService.get('JWT_SECRET_ACCESS');
  }

  get JWT_SECRET_REFRESH() {
    return this.configService.get('JWT_SECRET_REFRESH');
  }

  get AWS_S3_REGION() {
    return this.configService.get('AWS_S3_REGION');
  }

  get AWS_ACCESS_KEY() {
    return this.configService.get('AWS_ACCESS_KEY');
  }

  get AWS_SECRET_KEY() {
    return this.configService.get('AWS_SECRET_KEY');
  }

  get AWS_S3_BUCKET() {
    return this.configService.get('AWS_S3_BUCKET');
  }
}
