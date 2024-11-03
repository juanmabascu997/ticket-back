import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inscripto } from './entities/inscripto.entity';
import { CreateInscriptoDto } from './dto/create-inscripto.dto';
import { UpdateInscriptoDto } from './dto/update-inscripto.dto';

@Injectable()
export class InscriptoService {
  constructor(
    @InjectRepository(Inscripto)
    private readonly inscriptoRepository: Repository<Inscripto>,
  ) {}

  async create(createInscriptoDto: CreateInscriptoDto) {
    const inscripto = this.inscriptoRepository.create(createInscriptoDto);
    return await this.inscriptoRepository.save(inscripto);
  }

  async findAll() {
    return await this.inscriptoRepository.find({
      relations: ['cliente', 'eventos'],
    });
  }

  async findOne(id: number) {
    const inscripto = await this.inscriptoRepository.findOne({
      where: { id },
      relations: ['cliente', 'eventos'],
    });
    if (!inscripto) {
      throw new NotFoundException(`Inscripto with ID ${id} not found`);
    }
    return inscripto;
  }

  async update(id: number, updateInscriptoDto: UpdateInscriptoDto) {
    const result = await this.inscriptoRepository.update(id, updateInscriptoDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Inscripto with ID ${id} not found`);
    }
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.inscriptoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Inscripto with ID ${id} not found`);
    }
    return { deleted: true };
  }
}
