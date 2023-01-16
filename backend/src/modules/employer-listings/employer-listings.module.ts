import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployerListing } from 'src/entities/employerlisting.entity';
import { EmployerListingsController } from './employer-listings.controller';
import { EmployerListingsService } from './employer-listings.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmployerListing])],
  controllers: [EmployerListingsController],
  providers: [EmployerListingsService],
})
export class EmployerListingsModule {}
