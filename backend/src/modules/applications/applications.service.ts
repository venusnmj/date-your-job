import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from '../../entities/application.entity';
import { CreateApplicationDto, UpdateApplicationDto } from './applications.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private applicationsRepository: Repository<Application>,
  ) {}

  // ---------- Applications READ ---------- //
  async getAll(): Promise<Application[]> {
    return await this.applicationsRepository.find({
      relations: {
        applicant: true,
        employerListing: {
          employer: true
        }
      },
    });
  }
  async getAllSoftDeleted(): Promise<Application[]> {
    return (
      await this.applicationsRepository.find({
        withDeleted: true,
        relations: {
        applicant: true,
        employerListing: {
          employer: true
        }
      },
      })
    ).filter((application) => application.deletedAt != null);
  }

  async getOneById(applicationId: number): Promise<Application> {
    return await this.applicationsRepository.findOne({
      where: { applicationId },
      relations: {
        applicant: true,
        employerListing: {
          employer: true
        }
      },
    });
  }

  // ---------- Applications CREATE ---------- //
  async createOne(
    createApplicationDtoEntity: CreateApplicationDto,
  ): Promise<Application> {
    const newApplication = this.applicationsRepository.create(
      createApplicationDtoEntity,
    );
    return await this.applicationsRepository.save(newApplication);
  }

  // ---------- Applications UPDATE ---------- //
  async updateOne(
    updateApplicationDtoEntity: UpdateApplicationDto,
  ): Promise<Application> {
    return await this.applicationsRepository.save(updateApplicationDtoEntity);
  }

  // ---------- Applications DELETE ---------- //
  async softDeleteOne(applicationId: number): Promise<boolean> {
    const res = await this.applicationsRepository.softDelete(applicationId);
    return res.affected > 0;
  }
  async deleteOne(applicationId: number): Promise<boolean> {
    const res = await this.applicationsRepository.delete(applicationId);
    return res.affected > 0;
  }

  // ---------- Applications Restore ---------- //
  async restoreOne(applicationId: number): Promise<boolean> {
    const restoreResponse = await this.applicationsRepository.restore(
      applicationId,
    );
    return restoreResponse.affected > 0;
  }
}
