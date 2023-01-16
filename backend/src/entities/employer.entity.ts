import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EmployerListing } from './employerlisting.entity';
import { User } from './user.entity';

@Entity()
export class Employer {
  @PrimaryGeneratedColumn()
  employerId!: number;

  @Column()
  companyName!: string;

  @Column()
  country!: string;

  @Column()
  address!: string;

  @Column()
  description!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  // -------------------- Relationships -------------------- //
  // Listings
  @OneToMany(
    () => EmployerListing,
    (employerListing) => employerListing.employer,
    { nullable: true },
  )
  listings?: EmployerListing[];

  // User
  @OneToOne(() => User, (user) => user.employer)
  user!: User;
}
