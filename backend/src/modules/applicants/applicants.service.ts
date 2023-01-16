import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Applicant } from '../../entities/applicant.entity';
import { CreateApplicantDto, UpdateApplicantDto } from './applicants.dto';

@Injectable()
export class ApplicantsService {
  constructor(
    @InjectRepository(Applicant)
    private applicantsRepository: Repository<Applicant>,
  ) {}

  // ---------- Applicants READ ---------- //
  async getAll(): Promise<Applicant[]> {
    return await this.applicantsRepository.find({
      relations: ['user', 'topTech', 'applications'],
    });
  }
  async getAllSoftDeleted(): Promise<Applicant[]> {
    return (
      await this.applicantsRepository.find({
        withDeleted: true,
        relations: ['user', 'topTech', 'applications'],
      })
    ).filter((applicant) => applicant.deletedAt != null);
  }

  async getOneById(applicantId: number): Promise<Applicant> {
    return await this.applicantsRepository.findOne({
      where: { applicantId },
      relations: ['user', 'topTech', 'applications'],
    });
  }

  // ---------- Applicants CREATE ---------- //
  async createOne(
    createApplicantDtoEntity: CreateApplicantDto,
  ): Promise<Applicant> {
    const newApplicant = this.applicantsRepository.create(
      createApplicantDtoEntity,
    );
    return await this.applicantsRepository.save(newApplicant);
  }

  // ---------- Applicants UPDATE ---------- //
  async updateOne(
    updateApplicantDtoEntity: UpdateApplicantDto,
  ): Promise<Applicant> {
    return await this.applicantsRepository.save(updateApplicantDtoEntity);
  }

  // ---------- Applicants DELETE ---------- //
  async softDeleteOne(applicantId: number): Promise<boolean> {
    const res = await this.applicantsRepository.softDelete(applicantId);
    return res.affected > 0;
  }
  async deleteOne(applicantId: number): Promise<boolean> {
    const res = await this.applicantsRepository.delete(applicantId);
    return res.affected > 0;
  }

  // ---------- Applicants Restore ---------- //
  async restoreOne(applicantId: number): Promise<boolean> {
    const restoreResponse = await this.applicantsRepository.restore(
      applicantId,
    );
    return restoreResponse.affected > 0;
  }
}
