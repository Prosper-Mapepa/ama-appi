import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PageSectionsModule } from './modules/page-sections/page-sections.module';
import { EventsModule } from './modules/events/events.module';
import { TeamModule } from './modules/team/team.module';
import { GalleryModule } from './modules/gallery/gallery.module';
import { SettingsModule } from './modules/settings/settings.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { MembershipsModule } from './modules/memberships/memberships.module';
import { EventRsvpsModule } from './modules/event-rsvps/event-rsvps.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: config.get('NODE_ENV') !== 'production',
      }),
      inject: [ConfigService],
    }),
    PageSectionsModule,
    EventsModule,
    TeamModule,
    GalleryModule,
    SettingsModule,
    UsersModule,
    AuthModule,
    UploadsModule,
    MembershipsModule,
    EventRsvpsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
