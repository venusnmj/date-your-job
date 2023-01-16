import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tech } from './tech.entity';
import { User } from './user.entity';

@Entity()
export class Applicant {
  @PrimaryGeneratedColumn()
  applicantId!: number;

  @Column()
  fullname!: string;

  @Column()
  age!: number;

  @Column()
  gender!: string;

  @Column()
  country!: string;

  @Column({ nullable: true })
  education?: string;

  @Column({ nullable: true })
  work?: string;

  @Column({ nullable: true })
  linkedin?: string;

  @Column({ nullable: true })
  github?: string;

  @Column({ nullable: true })
  personalSite?: string;

  @Column({ nullable: true })
  tagline?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  // -------------------- Relationships -------------------- //
  // Tech
  @ManyToMany(() => Tech, (tech) => tech.applicants, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  topTech?: Tech[];

  // Description
  // @OneToOne()

  // Applications
  // @OneToMany()

  // User
  @OneToOne(() => User, (user) => user.applicant)
  user!: User;
}
