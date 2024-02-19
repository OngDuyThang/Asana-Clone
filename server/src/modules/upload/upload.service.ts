import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Env } from 'src/config/env/env.service';
import { throwException } from 'src/utils/exceptions';

@Injectable()
export class UploadService {
  private s3Client = new S3Client({
    region: this.env.AWS_S3_REGION,
    credentials: {
      accessKeyId: this.env.AWS_ACCESS_KEY,
      secretAccessKey: this.env.AWS_SECRET_KEY,
    },
  });
  constructor(private env: Env) {}

  async uploadFile(
    fileName: string,
    fileType: string,
    file: Buffer,
  ): Promise<string> {
    try {
      const res = await new Upload({
        client: this.s3Client,
        params: {
          Bucket: this.env.AWS_S3_BUCKET,
          Key: fileName,
          Body: file,
          ACL: 'public-read',
          ContentType: fileType,
        },
      }).done();
      if (!res) {
        throw new InternalServerErrorException();
      }
      return res.Location;
    } catch (e) {
      throwException(e);
    }
  }
}
