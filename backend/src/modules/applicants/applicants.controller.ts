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
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { of } from 'rxjs';
import { storage } from '../../common/utils/storage';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateApplicantDto, UpdateApplicantDto } from './applicants.dto';
import { ApplicantsService } from './applicants.service';

@Controller('applicants')
export class ApplicantsController {
  constructor(private applicantsService: ApplicantsService) {}

  // ---------- Applicants READ ---------- //
  @Get()
  async getAll() {
    return await this.applicantsService.getAll();
  }
  @Get('/softdeleted')
  async getAllSoftDeleted() {
    return await this.applicantsService.getAllSoftDeleted();
  }

  @Get('/:applicantId')
  async getOneById(@Param('applicantId', ParseIntPipe) applicantId: number) {
    const applicant = await this.applicantsService.getOneById(applicantId);
    if (applicant) return applicant;
    else
      throw new HttpException('Applicant not found!', HttpStatus.BAD_REQUEST);
  }

  // ---------- Applicants CREATE ---------- //
  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(ValidationPipe)
  async createOne(@Body() createApplicantDtoEntity: CreateApplicantDto) {
    return await this.applicantsService.createOne(createApplicantDtoEntity);
  }

  // ---------- Applicants UPDATE ---------- //
  @UseGuards(JwtAuthGuard)
  @Put()
  @UsePipes(ValidationPipe)
  async updateOne(@Body() updateApplicantDtoEntity: UpdateApplicantDto) {
    return await this.applicantsService.updateOne(updateApplicantDtoEntity);
  }

  // ---------- Applicants DELETE ---------- //
  @UseGuards(JwtAuthGuard)
  @Delete('/:applicantId')
  async softDeleteOne(@Param('applicantId', ParseIntPipe) applicantId: number) {
    return await this.applicantsService.softDeleteOne(applicantId);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/permanent-delete/:applicantId')
  async deleteOne(@Param('applicantId', ParseIntPipe) applicantId: number) {
    return await this.applicantsService.deleteOne(applicantId);
  }

  // ---------- Applicants Restore ---------- //
  @UseGuards(JwtAuthGuard)
  @Put('/restore-one/:applicantId')
  async restoreOne(@Param('applicantId', ParseIntPipe) applicantId: number) {
    return await this.applicantsService.restoreOne(applicantId);
  }

  // ---------- Uploads ---------- //
  @UseGuards(JwtAuthGuard)
  @Post('upload/:applicantId')
  @UseInterceptors(FileInterceptor('file', storage))
  async uploadFile(
    @UploadedFile() file,
    @Param('applicantId', ParseIntPipe) applicantId: number,
  ) {
    const applicant: UpdateApplicantDto = {
      applicantId: applicantId,
      image: file.filename,
    };

    return await this.applicantsService.updateOne(applicant);
  }

  @Get('image/:imagename')
  findOneImage(@Param('imagename') imagename, @Res() res) {
    return of(res.sendFile(join(process.cwd(), 'uploads/images/' + imagename)));
  }
}
