import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employer } from '../../entities/employer.entity';
import { EmployersController } from './employers.controller';
import { EmployersService } from './employers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Employer])],
  controllers: [EmployersController],
  providers: [EmployersService],
})
export class EmployersModule {}
