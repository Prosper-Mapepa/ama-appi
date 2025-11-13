import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  IsUrl,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateTeamMemberDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 120)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 120)
  role: string;

  @IsOptional()
  @IsString()
  @Length(0, 160)
  major?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @Transform(({ value }) => (value === null || value === '' ? undefined : value))
  @IsEmail()
  @Length(1, 160)
  email?: string;

  @IsOptional()
  @Transform(({ value }) => (value === null || value === '' ? undefined : value))
  @IsUrl()
  linkedin?: string;

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
