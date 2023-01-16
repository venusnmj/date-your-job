import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Applicant } from './applicant.entity';
import { EmployerListing } from './employerlisting.entity';

@Entity()
export class Tech {
  @PrimaryGeneratedColumn()
  techId!: number;

  @Column()
  name!: string;

  @Column()
  source!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  // -------------------- Relationships -------------------- //
  // Applicant
  @ManyToMany(() => Applicant, (applicant) => applicant.topTech, {
    nullable: true,
  })
  @JoinTable({
    name: 'applicants_tech',
    joinColumn: { name: 'applicantId' },
    inverseJoinColumn: { name: 'techId' },
  })
  applicants?: Applicant[];

  // EmployerListing
  @ManyToMany(
    () => EmployerListing,
    (employerListing) => employerListing.tech,
    { nullable: true },
  )
  @JoinTable({
    name: 'employerlistings_tech',
    joinColumn: { name: 'employerListingId' },
    inverseJoinColumn: { name: 'techId' },
  })
  employerListings?: EmployerListing[];
}
