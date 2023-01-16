import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PromptResponse } from '../../entities/prompt-response.entity';
import {
  CreatePromptResponseDto,
  UpdatePromptResponseDto,
} from './prompt-reponses.dto';

@Injectable()
export class PromptResponsesService {
  constructor(
    @InjectRepository(PromptResponse)
    private promptResponsesRepository: Repository<PromptResponse>,
  ) {}

  // ---------- PromptResponses READ ---------- //
  async getAll(): Promise<PromptResponse[]> {
    return await this.promptResponsesRepository.find({
      relations: ['prompt', 'applicant'],
    });
  }
  async getAllSoftDeleted(): Promise<PromptResponse[]> {
    return (
      await this.promptResponsesRepository.find({
        withDeleted: true,
        relations: ['prompt', 'applicant'],
      })
    ).filter((promptResponse) => promptResponse.deletedAt != null);
  }

  async getOneById(promptResponseId: number): Promise<PromptResponse> {
    return await this.promptResponsesRepository.findOne({
      where: { promptResponseId },
      relations: ['prompt', 'applicant'],
    });
  }

  // ---------- PromptResponses CREATE ---------- //
  async createOne(
    createPromptResponseDtoEntity: CreatePromptResponseDto,
  ): Promise<PromptResponse> {
    const newPrompt = this.promptResponsesRepository.create(
      createPromptResponseDtoEntity,
    );
    return await this.promptResponsesRepository.save(newPrompt);
  }

  // ---------- PromptResponses UPDATE ---------- //
  async updateOne(
    updatePromptResponseDtoEntity: UpdatePromptResponseDto,
  ): Promise<PromptResponse> {
    return await this.promptResponsesRepository.save(
      updatePromptResponseDtoEntity,
    );
  }

  // ---------- PromptResponses DELETE ---------- //
  async softDeleteOne(promptResponseId: number): Promise<boolean> {
    const res = await this.promptResponsesRepository.softDelete(
      promptResponseId,
    );
    return res.affected > 0;
  }
  async deleteOne(promptResponseId: number): Promise<boolean> {
    const res = await this.promptResponsesRepository.delete(promptResponseId);
    return res.affected > 0;
  }

  // ---------- PromptResponses Restore ---------- //
  async restoreOne(promptResponseId: number): Promise<boolean> {
    const restoreResponse = await this.promptResponsesRepository.restore(
      promptResponseId,
    );
    return restoreResponse.affected > 0;
  }
}
