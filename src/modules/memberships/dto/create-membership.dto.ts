import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import type { MembershipPaymentMethod, MembershipPlan } from '../membership.entity';

export class CreateMembershipDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  lastName: string;

  @IsEmail()
  @MaxLength(160)
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(32)
  phone?: string;

  @IsEnum(['chapter'])
  planType: MembershipPlan;

  @IsEnum(['card', 'paypal', 'cash'])
  paymentMethod: MembershipPaymentMethod;

  @IsInt()
  @Min(0)
  amount: number;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  transactionReference?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

