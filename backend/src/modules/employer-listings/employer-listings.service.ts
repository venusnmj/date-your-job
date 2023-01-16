import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployerListing } from '../../entities/employerlisting.entity';
import {
  CreateEmployerListingDto,
  UpdateEmployerListingDto,
} from './employer-listings.dto';

@Injectable()
export class EmployerListingsService {
  constructor(
    @InjectRepository(EmployerListing)
    private employerListingsRepository: Repository<EmployerListing>,
  ) {}

  // ---------- EmployerListings READ ---------- //
  async getAll(): Promise<EmployerListing[]> {
    return await this.employerListingsRepository.find({
      relations: ['tech'],
    });
  }
  async getAllSoftDeleted(): Promise<EmployerListing[]> {
    return (
      await this.employerListingsRepository.find({
        withDeleted: true,
        relations: ['tech'],
      })
    ).filter((employerListing) => employerListing.deletedAt != null);
  }

  async getOneById(employerListingId: number): Promise<EmployerListing> {
    return await this.employerListingsRepository.findOne({
      where: { employerListingId },
      relations: ['tech'],
    });
  }

  // ---------- EmployerListings CREATE ---------- //
  async createOne(
    createEmployerListingDtoEntity: CreateEmployerListingDto,
  ): Promise<EmployerListing> {
    const newEmployerListing = this.employerListingsRepository.create(
      createEmployerListingDtoEntity,
    );
    return await this.employerListingsRepository.save(newEmployerListing);
  }

  // ---------- EmployerListings UPDATE ---------- //
  async updateOne(
    updateEmployerListingDtoEntity: UpdateEmployerListingDto,
  ): Promise<EmployerListing> {
    return await this.employerListingsRepository.save(
      updateEmployerListingDtoEntity,
    );
  }

  // ---------- EmployerListings DELETE ---------- //
  async softDeleteOne(employerListingId: number): Promise<boolean> {
    const res = await this.employerListingsRepository.softDelete(
      employerListingId,
    );
    return res.affected > 0;
  }
  async deleteOne(employerListingId: number): Promise<boolean> {
    const res = await this.employerListingsRepository.delete(employerListingId);
    return res.affected > 0;
  }

  // ---------- EmployerListings Restore ---------- //
  async restoreOne(employerListingId: number): Promise<boolean> {
    const restoreResponse = await this.employerListingsRepository.restore(
      employerListingId,
    );
    return restoreResponse.affected > 0;
  }
}
