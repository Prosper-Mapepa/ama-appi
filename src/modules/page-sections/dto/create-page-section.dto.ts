import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  IsIn,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { PageSectionName } from '../page-section.entity';

const PAGES: PageSectionName[] = ['home', 'about'];

export class CreatePageSectionDto {
  @IsString()
  @IsIn(PAGES)
  page: PageSectionName;

  @IsString()
  @IsNotEmpty()
  @Length(1, 120)
  title: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 180)
  heading: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @Transform(({ value }) => (value === null || value === '' ? undefined : value))
  @Matches(/^https?:\/\/.+|^\/uploads\/.+/, {
    message: 'imageUrl must be an absolute URL or start with /uploads/',
  })
  imageUrl?: string | null;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(999)
  displayOrder?: number;
}
