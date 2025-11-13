import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageSection } from './page-section.entity';
import { PageSectionsService } from './page-sections.service';
import { PageSectionsController } from './page-sections.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([PageSection]), AuthModule],
  controllers: [PageSectionsController],
  providers: [PageSectionsService],
  exports: [PageSectionsService],
})
export class PageSectionsModule {}
