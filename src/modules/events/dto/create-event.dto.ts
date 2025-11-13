import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 160)
  title: string;

  @IsDateString()
  date: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 120)
  time: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 160)
  location: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 80)
  category: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(10000)
  spots?: number;

  @IsOptional()
  @Transform(({ value }) => (value === null || value === '' ? undefined : value))
  @Matches(/^https?:\/\/.+|^\/uploads\/.+/, {
    message: 'imageUrl must be an absolute URL or start with /uploads/',
  })
  imageUrl?: string | null;
}
