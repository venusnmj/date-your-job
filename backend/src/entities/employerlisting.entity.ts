import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Application } from './application.entity';
import { Employer } from './employer.entity';
import { Tech } from './tech.entity';

@Entity()
export class EmployerListing {
  @PrimaryGeneratedColumn()
  employerListingId!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column({ nullable: true })
  salary?: string;

  @Column({ nullable: true })
  location?: string;

  @Column()
  jobType!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  // -------------------- Relationships -------------------- //
  // Tech
  @ManyToMany(() => Tech, (tech) => tech.employerListings, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  tech?: Tech[];

  // Applications
  @OneToMany(() => Application, (application) => application.employerListing, {
    nullable: true,
  })
  applications?: Application[];

  // Listing
  @ManyToOne(() => Employer, (employer) => employer.listings, {
    onDelete: 'CASCADE',
  })
  employer!: Employer;
}
