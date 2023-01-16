import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateEmployerDto, UpdateEmployerDto } from './employers.dto';
import { EmployersService } from './employers.service';

@Controller('employers')
export class EmployersController {
  constructor(private employersService: EmployersService) {}

  // ---------- Employers READ ---------- //
  @Get()
  async getAll() {
    return await this.employersService.getAll();
  }
  @Get('/softdeleted')
  async getAllSoftDeleted() {
    return await this.employersService.getAllSoftDeleted();
  }

  @Get('/:employerId')
  async getOneById(@Param('employerId', ParseIntPipe) employerId: number) {
    const employer = await this.employersService.getOneById(employerId);
    if (employer) return employer;
    else throw new HttpException('Employer not found!', HttpStatus.BAD_REQUEST);
  }

  // ---------- Employers CREATE ---------- //
  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(ValidationPipe)
  async createOne(@Body() createEmployerDtoEntity: CreateEmployerDto) {
    return await this.employersService.createOne(createEmployerDtoEntity);
  }

  // ---------- Employers UPDATE ---------- //
  @UseGuards(JwtAuthGuard)
  @Put()
  @UsePipes(ValidationPipe)
  async updateOne(@Body() updateEmployerDtoEntity: UpdateEmployerDto) {
    return await this.employersService.updateOne(updateEmployerDtoEntity);
  }

  // ---------- Employers DELETE ---------- //
  @UseGuards(JwtAuthGuard)
  @Delete('/:employerId')
  async softDeleteOne(@Param('employerId', ParseIntPipe) employerId: number) {
    return await this.employersService.softDeleteOne(employerId);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/permanent-delete/:employerId')
  async deleteOne(@Param('employerId', ParseIntPipe) employerId: number) {
    return await this.employersService.deleteOne(employerId);
  }

  // ---------- Employers Restore ---------- //
  @UseGuards(JwtAuthGuard)
  @Put('/restore-one/:employerId')
  async restoreOne(@Param('employerId', ParseIntPipe) employerId: number) {
    return await this.employersService.restoreOne(employerId);
  }
}
