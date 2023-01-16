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
import {
  CreateEmployerListingDto,
  UpdateEmployerListingDto,
} from './employer-listings.dto';
import { EmployerListingsService } from './employer-listings.service';

@Controller('employer-listings')
export class EmployerListingsController {
  constructor(private employerListingsService: EmployerListingsService) {}

  // ---------- EmployerListings READ ---------- //
  @Get()
  async getAll() {
    return await this.employerListingsService.getAll();
  }
  @Get('/softdeleted')
  async getAllSoftDeleted() {
    return await this.employerListingsService.getAllSoftDeleted();
  }

  @Get('/:employerListingId')
  async getOneById(
    @Param('employerListingId', ParseIntPipe) employerListingId: number,
  ) {
    const employerListing = await this.employerListingsService.getOneById(
      employerListingId,
    );
    if (employerListing) return employerListing;
    else throw new HttpException('Listing not found!', HttpStatus.BAD_REQUEST);
  }

  // ---------- EmployerListings CREATE ---------- //
  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(ValidationPipe)
  async createOne(
    @Body() createEmployerListingDtoEntity: CreateEmployerListingDto,
  ) {
    return await this.employerListingsService.createOne(
      createEmployerListingDtoEntity,
    );
  }

  // ---------- EmployerListings UPDATE ---------- //
  @UseGuards(JwtAuthGuard)
  @Put()
  @UsePipes(ValidationPipe)
  async updateOne(
    @Body() updateEmployerListingDtoEntity: UpdateEmployerListingDto,
  ) {
    return await this.employerListingsService.updateOne(
      updateEmployerListingDtoEntity,
    );
  }

  // ---------- EmployerListings DELETE ---------- //
  @UseGuards(JwtAuthGuard)
  @Delete('/:employerListingId')
  async softDeleteOne(
    @Param('employerListingId', ParseIntPipe) employerListingId: number,
  ) {
    return await this.employerListingsService.softDeleteOne(employerListingId);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/permanent-delete/:employerListingId')
  async deleteOne(
    @Param('employerListingId', ParseIntPipe) employerListingId: number,
  ) {
    return await this.employerListingsService.deleteOne(employerListingId);
  }

  // ---------- EmployerListings Restore ---------- //
  @UseGuards(JwtAuthGuard)
  @Put('/restore-one/:employerListingId')
  async restoreOne(
    @Param('employerListingId', ParseIntPipe) employerListingId: number,
  ) {
    return await this.employerListingsService.restoreOne(employerListingId);
  }

  // ---------- Uploads ---------- //
  @UseGuards(JwtAuthGuard)
  @Post('upload/:employerListingId')
  @UseInterceptors(FileInterceptor('file', storage))
  async uploadFile(
    @UploadedFile() file,
    @Param('employerListingId', ParseIntPipe) employerListingId: number,
  ) {
    const employerListing: UpdateEmployerListingDto = {
      employerListingId: employerListingId,
      image: file.filename,
    };

    return await this.employerListingsService.updateOne(employerListing);
  }

  @Get('image/:imagename')
  findOneImage(@Param('imagename') imagename, @Res() res) {
    return of(res.sendFile(join(process.cwd(), 'uploads/images/' + imagename)));
  }
}
