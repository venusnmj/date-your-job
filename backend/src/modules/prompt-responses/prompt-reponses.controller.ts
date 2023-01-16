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
  CreatePromptResponseDto,
  UpdatePromptResponseDto,
} from './prompt-reponses.dto';
import { PromptResponsesService } from './prompt-reponses.service';

@Controller('prompts')
export class PromptResponsesController {
  constructor(private promptResponsesService: PromptResponsesService) {}

  // ---------- PromptResponses READ ---------- //
  @Get()
  async getAll() {
    return await this.promptResponsesService.getAll();
  }
  @Get('/softdeleted')
  async getAllSoftDeleted() {
    return await this.promptResponsesService.getAllSoftDeleted();
  }

  @Get('/:promptResponseId')
  async getOneById(
    @Param('promptResponseId', ParseIntPipe) promptResponseId: number,
  ) {
    const promptResponse = await this.promptResponsesService.getOneById(
      promptResponseId,
    );
    if (promptResponse) return promptResponse;
    else
      throw new HttpException(
        'Prompt Response not found!',
        HttpStatus.BAD_REQUEST,
      );
  }

  // ---------- PromptResponses CREATE ---------- //
  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(ValidationPipe)
  async createOne(
    @Body() createPromptResponseDtoEntity: CreatePromptResponseDto,
  ) {
    return await this.promptResponsesService.createOne(
      createPromptResponseDtoEntity,
    );
  }

  // ---------- PromptResponses UPDATE ---------- //
  @UseGuards(JwtAuthGuard)
  @Put()
  @UsePipes(ValidationPipe)
  async updateOne(
    @Body() updatePromptResponseDtoEntity: UpdatePromptResponseDto,
  ) {
    return await this.promptResponsesService.updateOne(
      updatePromptResponseDtoEntity,
    );
  }

  // ---------- PromptResponses DELETE ---------- //
  @UseGuards(JwtAuthGuard)
  @Delete('/:promptResponseId')
  async softDeleteOne(
    @Param('promptResponseId', ParseIntPipe) promptResponseId: number,
  ) {
    return await this.promptResponsesService.softDeleteOne(promptResponseId);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/permanent-delete/:promptResponseId')
  async deleteOne(
    @Param('promptResponseId', ParseIntPipe) promptResponseId: number,
  ) {
    return await this.promptResponsesService.deleteOne(promptResponseId);
  }

  // ---------- PromptResponses Restore ---------- //
  @UseGuards(JwtAuthGuard)
  @Put('/restore-one/:promptResponseId')
  async restoreOne(
    @Param('promptResponseId', ParseIntPipe) promptResponseId: number,
  ) {
    return await this.promptResponsesService.restoreOne(promptResponseId);
  }
}
