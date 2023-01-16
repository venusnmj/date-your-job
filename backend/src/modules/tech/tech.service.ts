import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tech } from '../../entities/tech.entity';
import { CreateTechDto, UpdateTechDto } from './tech.dto';

@Injectable()
export class TechService {
  constructor(
    @InjectRepository(Tech)
    private techRepository: Repository<Tech>,
  ) {}

  // ---------- Tech READ ---------- //
  async getAll(): Promise<Tech[]> {
    return await this.techRepository.find({
      relations: ['applicants', 'employerListings'],
    });
  }
  async getAllSoftDeleted(): Promise<Tech[]> {
    return (
      await this.techRepository.find({
        withDeleted: true,
        relations: ['applicants', 'employerListings'],
      })
    ).filter((tech) => tech.deletedAt != null);
  }

  async getOneById(techId: number): Promise<Tech> {
    return await this.techRepository.findOne({
      where: { techId },
      relations: ['applicants', 'employerListings'],
    });
  }

  // ---------- Tech CREATE ---------- //
  async createOne(createTechDtoEntity: CreateTechDto): Promise<Tech> {
    const newTech = this.techRepository.create(createTechDtoEntity);
    return await this.techRepository.save(newTech);
  }

  // ---------- Tech UPDATE ---------- //
  async updateOne(updateTechDtoEntity: UpdateTechDto): Promise<Tech> {
    return await this.techRepository.save(updateTechDtoEntity);
  }

  // ---------- Tech DELETE ---------- //
  async softDeleteOne(techId: number): Promise<boolean> {
    const res = await this.techRepository.softDelete(techId);
    return res.affected > 0;
  }
  async deleteOne(techId: number): Promise<boolean> {
    const res = await this.techRepository.delete(techId);
    return res.affected > 0;
  }

  // ---------- Tech Restore ---------- //
  async restoreOne(techId: number): Promise<boolean> {
    const restoreResponse = await this.techRepository.restore(techId);
    return restoreResponse.affected > 0;
  }
}
