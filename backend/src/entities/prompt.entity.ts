import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PromptResponse } from './prompt-response.entity';

@Entity()
export class Prompt {
  @PrimaryGeneratedColumn()
  promptId!: number;

  @Column()
  title!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  // -------------------- Relationships -------------------- //
  @OneToMany(() => PromptResponse, (promptResonse) => promptResonse.prompt, {
    nullable: true,
  })
  promptResponses?: PromptResponse[];
}
