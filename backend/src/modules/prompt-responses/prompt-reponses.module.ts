import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromptResponse } from '../../entities/prompt-response.entity';
import { PromptResponsesController } from './prompt-reponses.controller';
import { PromptResponsesService } from './prompt-reponses.service';

@Module({
  imports: [TypeOrmModule.forFeature([PromptResponse])],
  controllers: [PromptResponsesController],
  providers: [PromptResponsesService],
})
export class PromptResponsesModule {}
