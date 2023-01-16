import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Applicant } from './applicant.entity';
import { Prompt } from './prompt.entity';

@Entity()
export class PromptResponse {
  @PrimaryGeneratedColumn()
  promptResponseId!: number;

  @Column()
  description!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  // -------------------- Relationships -------------------- //
  // Prompt
  @ManyToOne(() => Prompt, (prompt) => prompt.promptResponses, {
    onDelete: 'CASCADE',
  })
  prompt!: Prompt;

  // Applicant
  @ManyToOne(() => Applicant, (applicant) => applicant.promptResponses, {
    onDelete: 'CASCADE',
  })
  applicant!: Applicant;
}
