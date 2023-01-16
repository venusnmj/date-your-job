import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './configs/ormconfig';
import { ApplicantsModule } from './modules/applicants/applicants.module';
import { ApplicationsModule } from './modules/applications/applications.module';
import { AuthModule } from './modules/auth/auth.module';
import { EmployerListingsModule } from './modules/employer-listings/employer-listings.module';
import { EmployersModule } from './modules/employers/employers.module';
import { TechModule } from './modules/tech/tech.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    // Environment Variables
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      cache: true,
      load: [ormconfig],
    }),

    // Database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        configService.get('database'),
      inject: [ConfigService],
    }),

    AuthModule,
    UsersModule,
    ApplicantsModule,
    ApplicationsModule,
    EmployersModule,
    EmployerListingsModule,
    TechModule,
  ],
})
export class AppModule {}
