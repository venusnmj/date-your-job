import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Applicant } from './applicant.entity';
import { EmployerListing } from './employerlisting.entity';

export enum ApplicationStatusEnum {
  'Pending' = 'Pending',
  'Rejected' = 'Rejected',
  'Success' = 'Success',
}

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  applicationId!: number;

  @Column({ type: 'enum', enum: ApplicationStatusEnum })
  status!: ApplicationStatusEnum;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  // -------------------- Relationships -------------------- //
  // Applicant
  @ManyToOne(() => Applicant, (applicant) => applicant.applications, {
    onDelete: 'CASCADE',
  })
  applicant!: Applicant;

  // EmployerListing
  @ManyToOne(() => EmployerListing, (employerListing) => employerListing.applications, {
    onDelete: 'CASCADE',
  })
  employerListing!: EmployerListing;
}
