import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employer } from '../../entities/employer.entity';
import { CreateEmployerDto, UpdateEmployerDto } from './employers.dto';

@Injectable()
export class EmployersService {
  constructor(
    @InjectRepository(Employer)
    private employersRepository: Repository<Employer>,
  ) {}

  // ---------- Employers READ ---------- //
  async getAll(): Promise<Employer[]> {
    return await this.employersRepository.find({
      relations: ['user'],
    });
  }
  async getAllSoftDeleted(): Promise<Employer[]> {
    return (
      await this.employersRepository.find({
        withDeleted: true,
        relations: ['user'],
      })
    ).filter((employer) => employer.deletedAt != null);
  }

  async getOneById(employerId: number): Promise<Employer> {
    return await this.employersRepository.findOne({
      where: { employerId },
      relations: ['user'],
    });
  }

  // ---------- Employers CREATE ---------- //
  async createOne(
    createEmployerDtoEntity: CreateEmployerDto,
  ): Promise<Employer> {
    const newEmployer = this.employersRepository.create(
      createEmployerDtoEntity,
    );
    return await this.employersRepository.save(newEmployer);
  }

  // ---------- Employers UPDATE ---------- //
  async updateOne(
    updateEmployerDtoEntity: UpdateEmployerDto,
  ): Promise<Employer> {
    return await this.employersRepository.save(updateEmployerDtoEntity);
  }

  // ---------- Employers DELETE ---------- //
  async softDeleteOne(employerId: number): Promise<boolean> {
    const res = await this.employersRepository.softDelete(employerId);
    return res.affected > 0;
  }
  async deleteOne(employerId: number): Promise<boolean> {
    const res = await this.employersRepository.delete(employerId);
    return res.affected > 0;
  }

  // ---------- Employers Restore ---------- //
  async restoreOne(employerId: number): Promise<boolean> {
    const restoreResponse = await this.employersRepository.restore(employerId);
    return restoreResponse.affected > 0;
  }
}
