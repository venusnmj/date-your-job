import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prompt } from '../../entities/prompt.entity';
import { PromptsController } from './prompts.controller';
import { PromptsService } from './prompts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Prompt])],
  controllers: [PromptsController],
  providers: [PromptsService],
})
export class PromptsModule {}
