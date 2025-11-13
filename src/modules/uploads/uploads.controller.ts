import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

type UploadedImageFile = {
  filename: string;
  originalname: string;
  mimetype: string;
  size: number;
};

function isUploadedImageFile(value: unknown): value is UploadedImageFile {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.filename === 'string' &&
    typeof candidate.originalname === 'string' &&
    typeof candidate.mimetype === 'string' &&
    typeof candidate.size === 'number'
  );
}

@Controller('uploads')
export class UploadsController {
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: unknown, @Req() req: Request) {
    if (!isUploadedImageFile(file)) {
      throw new BadRequestException('File is required');
    }

    const protocolHeader = req.headers['x-forwarded-proto'];
    const protocol = Array.isArray(protocolHeader)
      ? protocolHeader[0]
      : (protocolHeader ?? req.protocol);
    const host = req.get('host');
    const baseUrlEnv =
      process.env.MEDIA_BASE_URL ?? process.env.API_BASE_URL ?? '';
    const baseUrl =
      baseUrlEnv.trim().length > 0
        ? baseUrlEnv.replace(/\/$/, '')
        : `${protocol}://${host}`;

    const relativePath = `/uploads/${file.filename}`;

    return {
      path: relativePath,
      url: `${baseUrl}${relativePath}`,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
    };
  }
}
