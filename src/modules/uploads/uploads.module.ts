import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import type { FileFilterCallback } from 'multer';
import type { Request } from 'express';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { randomUUID } from 'crypto';
import { UploadsController } from './uploads.controller';

type IncomingImageFile = {
  originalname: string;
  mimetype: string;
};

function ensureUploadDirectory(): string {
  const uploadDir = join(process.cwd(), 'uploads');
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true });
  }
  return uploadDir;
}

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: (
          _req: Request,
          _file: IncomingImageFile,
          cb: (error: Error | null, destination: string) => void,
        ) => {
          const uploadDir = ensureUploadDirectory();
          cb(null, uploadDir);
        },
        filename: (
          _req: Request,
          file: IncomingImageFile,
          cb: (error: Error | null, filename: string) => void,
        ) => {
          const uniqueSuffix = `${Date.now()}-${randomUUID()}`;
          const fileExt = extname(file.originalname) || '';
          cb(null, `${uniqueSuffix}${fileExt.toLowerCase()}`);
        },
      }),
      fileFilter: (
        _req: Request,
        file: IncomingImageFile,
        cb: FileFilterCallback,
      ) => {
        if (!file.mimetype.startsWith('image/')) {
          cb(new Error('Only image uploads are allowed'));
          return;
        }
        cb(null, true);
      },
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
      },
    }),
  ],
  controllers: [UploadsController],
})
export class UploadsModule {}
