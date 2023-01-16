import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from '../../common/utils/bcrypt';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  // ---------- Users READ ---------- //
  async getAll(): Promise<User[]> {
    return await this.usersRepository.find({
      relations: ['applicant', 'employer'],
    });
  }
  async getAllSoftDeleted(): Promise<User[]> {
    return (
      await this.usersRepository.find({
        withDeleted: true,
        relations: ['applicant', 'employer'],
      })
    ).filter((user) => user.deletedAt != null);
  }

  async getOneById(userId: number): Promise<User> {
    return await this.usersRepository.findOne({
      where: { userId },
      relations: ['applicant', 'employer'],
    });
  }
  async getOneByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: { email },
      relations: ['applicant', 'employer'],
    });
  }

  // ---------- Retrieving specific fields ---------- //
  async getAllOfOneField(fieldName: string): Promise<string[]> {
    return (await this.usersRepository.find()).map((user) => user[fieldName]);
  }

  // ---------- Users CREATE ---------- //
  async createOne(createUserDtoEntity: CreateUserDto): Promise<User> {
    const passwordHash = hashPassword(createUserDtoEntity.password); // hash password

    const newUser = this.usersRepository.create({
      ...createUserDtoEntity,
      passwordHash,
    });
    return await this.usersRepository.save(newUser);
  }

  // ---------- Users UPDATE ---------- //
  async updateOne(updateUserDtoEntity: UpdateUserDto): Promise<User> {
    if (updateUserDtoEntity.password != null) {
      const passwordHash = hashPassword(updateUserDtoEntity.password); // hash password
      return await this.usersRepository.save({
        ...updateUserDtoEntity,
        passwordHash,
      });
    } else return await this.usersRepository.save(updateUserDtoEntity);
  }

  // ---------- Users DELETE ---------- //
  async softDeleteOne(userId: number): Promise<boolean> {
    const res = await this.usersRepository.softDelete(userId);
    return res.affected > 0;
  }
  async deleteOne(userId: number): Promise<boolean> {
    const res = await this.usersRepository.delete(userId);
    return res.affected > 0;
  }

  // ---------- Users Restore ---------- //
  async restoreOne(userId: number): Promise<boolean> {
    const restoreResponse = await this.usersRepository.restore(userId);
    return restoreResponse.affected > 0;
  }
}
