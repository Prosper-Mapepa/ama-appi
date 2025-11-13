import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import type { MembershipStatus } from '../membership.entity';

export class UpdateMembershipStatusDto {
  @IsEnum(['pending', 'paid', 'cancelled'])
  status: MembershipStatus;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  transactionReference?: string;
}

