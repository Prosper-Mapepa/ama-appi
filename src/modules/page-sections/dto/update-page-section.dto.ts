import { PartialType } from '@nestjs/mapped-types';
import { CreatePageSectionDto } from './create-page-section.dto';

export class UpdatePageSectionDto extends PartialType(CreatePageSectionDto) {}
