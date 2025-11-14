import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';
import { extname, join } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

type UploadResult = {
  path: string;
  url: string;
  size: number;
  mimetype: string;
  originalName: string;
};

@Injectable()
export class UploadsService {
  private readonly client?: S3Client;
  private readonly bucketName?: string;
  private readonly publicBaseUrl?: string;
  private readonly localUploadDir: string;
  private readonly localBaseUrl: string;
  private readonly useR2: boolean;

  constructor(private readonly config: ConfigService) {
    const accountId = this.config.get<string>('R2_ACCOUNT_ID');
    const accessKeyId = this.config.get<string>('R2_ACCESS_KEY_ID');
    const secretAccessKey = this.config.get<string>('R2_SECRET_ACCESS_KEY');
    this.bucketName = this.config.get<string>('R2_BUCKET_NAME') ?? undefined;
    this.publicBaseUrl =
      this.config.get<string>('R2_PUBLIC_BASE_URL')?.replace(/\/$/, '') ??
      undefined;

    this.useR2 =
      !!accountId &&
      !!accessKeyId &&
      !!secretAccessKey &&
      !!this.bucketName &&
      !!this.publicBaseUrl;

    if (this.useR2) {
      this.client = new S3Client({
        region: 'auto',
        endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId: accessKeyId as string,
          secretAccessKey: secretAccessKey as string,
        },
      });
    }

    this.localUploadDir = join(process.cwd(), 'uploads');
    if (!existsSync(this.localUploadDir)) {
      mkdirSync(this.localUploadDir, { recursive: true });
    }
    const mediaBaseUrl = this.config.get<string>('MEDIA_BASE_URL');
    const apiBaseUrl = this.config.get<string>('API_BASE_URL');
    const fallbackBaseUrl = mediaBaseUrl ?? apiBaseUrl ?? 'http://localhost:4000';
    this.localBaseUrl = fallbackBaseUrl.replace(/\/$/, '');
  }

  async uploadImage(file: Express.Multer.File): Promise<UploadResult> {
    if (!file || !file.buffer) {
      throw new Error('File is required');
    }

    const extension = extname(file.originalname).toLowerCase();
    const key = `${Date.now()}-${randomUUID()}${extension}`;

    if (this.useR2 && this.client && this.bucketName && this.publicBaseUrl) {
      await this.client.send(
        new PutObjectCommand({
          Bucket: this.bucketName,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );
      return {
        path: key,
        url: `${this.publicBaseUrl}/${key}`,
        originalName: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
      };
    }

    const localPath = join(this.localUploadDir, key);
    writeFileSync(localPath, file.buffer);
    const relative = `/uploads/${key}`;
    return {
      path: relative,
      url: `${this.localBaseUrl}${relative}`,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
    };
  }
}

