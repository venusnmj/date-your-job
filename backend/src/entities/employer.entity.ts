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
  // @OneToMany()

  // User
  @OneToOne(() => User, (user) => user.employer)
  user!: User;
}
