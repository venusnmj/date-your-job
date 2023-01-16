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
import { CreateTechDto, UpdateTechDto } from './tech.dto';
import { TechService } from './tech.service';

@Controller('tech')
export class TechController {
  constructor(private techService: TechService) {}

  // ---------- Tech READ ---------- //
  @Get()
  async getAll() {
    return await this.techService.getAll();
  }
  @Get('/softdeleted')
  async getAllSoftDeleted() {
    return await this.techService.getAllSoftDeleted();
  }

  @Get('/:techId')
  async getOneById(@Param('techId', ParseIntPipe) techId: number) {
    const tech = await this.techService.getOneById(techId);
    if (tech) return tech;
    else throw new HttpException('Tech not found!', HttpStatus.BAD_REQUEST);
  }

  // ---------- Tech CREATE ---------- //
  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(ValidationPipe)
  async createOne(@Body() createTechDtoEntity: CreateTechDto) {
    return await this.techService.createOne(createTechDtoEntity);
  }

  // ---------- Tech UPDATE ---------- //
  @UseGuards(JwtAuthGuard)
  @Put()
  @UsePipes(ValidationPipe)
  async updateOne(@Body() updateTechDtoEntity: UpdateTechDto) {
    return await this.techService.updateOne(updateTechDtoEntity);
  }

  // ---------- Tech DELETE ---------- //
  @UseGuards(JwtAuthGuard)
  @Delete('/:techId')
  async softDeleteOne(@Param('techId', ParseIntPipe) techId: number) {
    return await this.techService.softDeleteOne(techId);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/permanent-delete/:techId')
  async deleteOne(@Param('techId', ParseIntPipe) techId: number) {
    return await this.techService.deleteOne(techId);
  }

  // ---------- Tech Restore ---------- //
  @UseGuards(JwtAuthGuard)
  @Put('/restore-one/:techId')
  async restoreOne(@Param('techId', ParseIntPipe) techId: number) {
    return await this.techService.restoreOne(techId);
  }
}
