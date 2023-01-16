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
import { CreatePromptDto, UpdatePromptDto } from './prompts.dto';
import { PromptsService } from './prompts.service';

@Controller('prompts')
export class PromptsController {
  constructor(private promptsService: PromptsService) {}

  // ---------- Prompts READ ---------- //
  @Get()
  async getAll() {
    return await this.promptsService.getAll();
  }
  @Get('/softdeleted')
  async getAllSoftDeleted() {
    return await this.promptsService.getAllSoftDeleted();
  }

  @Get('/:promptId')
  async getOneById(@Param('promptId', ParseIntPipe) promptId: number) {
    const prompt = await this.promptsService.getOneById(promptId);
    if (prompt) return prompt;
    else throw new HttpException('Prompt not found!', HttpStatus.BAD_REQUEST);
  }

  // ---------- Prompts CREATE ---------- //
  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(ValidationPipe)
  async createOne(@Body() createPromptDtoEntity: CreatePromptDto) {
    return await this.promptsService.createOne(createPromptDtoEntity);
  }

  // ---------- Prompts UPDATE ---------- //
  @UseGuards(JwtAuthGuard)
  @Put()
  @UsePipes(ValidationPipe)
  async updateOne(@Body() updatePromptDtoEntity: UpdatePromptDto) {
    return await this.promptsService.updateOne(updatePromptDtoEntity);
  }

  // ---------- Prompts DELETE ---------- //
  @UseGuards(JwtAuthGuard)
  @Delete('/:promptId')
  async softDeleteOne(@Param('promptId', ParseIntPipe) promptId: number) {
    return await this.promptsService.softDeleteOne(promptId);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/permanent-delete/:promptId')
  async deleteOne(@Param('promptId', ParseIntPipe) promptId: number) {
    return await this.promptsService.deleteOne(promptId);
  }

  // ---------- Prompts Restore ---------- //
  @UseGuards(JwtAuthGuard)
  @Put('/restore-one/:promptId')
  async restoreOne(@Param('promptId', ParseIntPipe) promptId: number) {
    return await this.promptsService.restoreOne(promptId);
  }
}
