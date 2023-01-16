import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prompt } from '../../entities/prompt.entity';
import { CreatePromptDto, UpdatePromptDto } from './prompts.dto';

@Injectable()
export class PromptsService {
  constructor(
    @InjectRepository(Prompt)
    private promptsRepository: Repository<Prompt>,
  ) {}

  // ---------- Prompts READ ---------- //
  async getAll(): Promise<Prompt[]> {
    return await this.promptsRepository.find({
      relations: ['promptResponses'],
    });
  }
  async getAllSoftDeleted(): Promise<Prompt[]> {
    return (
      await this.promptsRepository.find({
        withDeleted: true,
        relations: ['promptResponses'],
      })
    ).filter((prompt) => prompt.deletedAt != null);
  }

  async getOneById(promptId: number): Promise<Prompt> {
    return await this.promptsRepository.findOne({
      where: { promptId },
      relations: ['promptResponses'],
    });
  }

  // ---------- Prompts CREATE ---------- //
  async createOne(createPromptDtoEntity: CreatePromptDto): Promise<Prompt> {
    const newPrompt = this.promptsRepository.create(createPromptDtoEntity);
    return await this.promptsRepository.save(newPrompt);
  }

  // ---------- Prompts UPDATE ---------- //
  async updateOne(updatePromptDtoEntity: UpdatePromptDto): Promise<Prompt> {
    return await this.promptsRepository.save(updatePromptDtoEntity);
  }

  // ---------- Prompts DELETE ---------- //
  async softDeleteOne(promptId: number): Promise<boolean> {
    const res = await this.promptsRepository.softDelete(promptId);
    return res.affected > 0;
  }
  async deleteOne(promptId: number): Promise<boolean> {
    const res = await this.promptsRepository.delete(promptId);
    return res.affected > 0;
  }

  // ---------- Prompts Restore ---------- //
  async restoreOne(promptId: number): Promise<boolean> {
    const restoreResponse = await this.promptsRepository.restore(promptId);
    return restoreResponse.affected > 0;
  }
}
