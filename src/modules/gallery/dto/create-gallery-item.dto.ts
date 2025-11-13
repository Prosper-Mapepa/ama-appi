import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class CreateGalleryItemDto {
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Matches(/^https?:\/\/.+|^\/uploads\/.+/, {
    message: 'url must be an absolute URL or start with /uploads/',
  })
  url: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 160)
  title: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 80)
  category: string;

  @IsOptional()
  @IsString()
  @Length(0, 180)
  caption?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(999)
  displayOrder?: number;
}
