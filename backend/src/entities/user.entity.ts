import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Applicant } from './applicant.entity';
import { Employer } from './employer.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId!: number;

  @Column()
  email!: string;

  @Exclude() // exclude this field when '@UseInterceptors(ClassSerializerInterceptor)' is used
  @Column()
  passwordHash!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @Exclude() // exclude this field when '@UseInterceptors(ClassSerializerInterceptor)' is used
  @Column({ nullable: true })
  refreshToken?: string;

  // -------------------- Relationships -------------------- //
  // Applicant
  @OneToOne(() => Applicant, (applicant) => applicant.user, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  applicant?: Applicant;

  // Employer
  @OneToOne(() => Employer, (employer) => employer.user, { nullable: true })
  @JoinColumn()
  employer?: Employer;
}
