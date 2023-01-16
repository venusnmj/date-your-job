import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
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
}
