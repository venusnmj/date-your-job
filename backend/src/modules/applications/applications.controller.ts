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
import { CreateApplicationDto, UpdateApplicationDto } from './applications.dto';
import { ApplicationsService } from './applications.service';

@Controller('applications')
export class ApplicationsController {
  constructor(private applicationsService: ApplicationsService) {}

  // ---------- Applications READ ---------- //
  @Get()
  async getAll() {
    return await this.applicationsService.getAll();
  }
  @Get('/softdeleted')
  async getAllSoftDeleted() {
    return await this.applicationsService.getAllSoftDeleted();
  }

  @Get('/:applicationId')
  async getOneById(
    @Param('applicationId', ParseIntPipe) applicationId: number,
  ) {
    const application = await this.applicationsService.getOneById(
      applicationId,
    );
    if (application) return application;
    else
      throw new HttpException('Application not found!', HttpStatus.BAD_REQUEST);
  }

  // ---------- Applications CREATE ---------- //
  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(ValidationPipe)
  async createOne(@Body() createApplicationDtoEntity: CreateApplicationDto) {
    return await this.applicationsService.createOne(createApplicationDtoEntity);
  }

  // ---------- Applications UPDATE ---------- //
  @UseGuards(JwtAuthGuard)
  @Put()
  @UsePipes(ValidationPipe)
  async updateOne(@Body() updateApplicationDtoEntity: UpdateApplicationDto) {
    return await this.applicationsService.updateOne(updateApplicationDtoEntity);
  }

  // ---------- Applications DELETE ---------- //
  @UseGuards(JwtAuthGuard)
  @Delete('/:applicationId')
  async softDeleteOne(
    @Param('applicationId', ParseIntPipe) applicationId: number,
  ) {
    return await this.applicationsService.softDeleteOne(applicationId);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/permanent-delete/:applicationId')
  async deleteOne(@Param('applicationId', ParseIntPipe) applicationId: number) {
    return await this.applicationsService.deleteOne(applicationId);
  }

  // ---------- Applications Restore ---------- //
  @UseGuards(JwtAuthGuard)
  @Put('/restore-one/:applicationId')
  async restoreOne(
    @Param('applicationId', ParseIntPipe) applicationId: number,
  ) {
    return await this.applicationsService.restoreOne(applicationId);
  }
}
