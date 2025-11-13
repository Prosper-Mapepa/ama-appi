import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class UpsertSettingDto {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsObject()
  value: Record<string, unknown>;
}
