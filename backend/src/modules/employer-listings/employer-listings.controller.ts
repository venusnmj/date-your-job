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
}
