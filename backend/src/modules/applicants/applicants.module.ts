import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Applicant } from '../../entities/applicant.entity';
import { ApplicantsController } from './applicants.controller';
import { ApplicantsService } from './applicants.service';

@Module({
  imports: [TypeOrmModule.forFeature([Applicant])],
  controllers: [ApplicantsController],
  providers: [ApplicantsService],
})
export class ApplicantsModule {}
