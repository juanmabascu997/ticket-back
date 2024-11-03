import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Evento } from 'src/eventos/entities/evento.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommonService {
  constructor(
    @InjectRepository(Evento)
    private eventoRepository: Repository<Evento>,
  ) {}

  async findClientByEventoId(id: number) {
    const evento = await this.eventoRepository.findOne({
      where: { id },
      relations: ['cliente', 'inscriptos'],
    });
    console.log("findClientByEventoId: ",evento);
    
    if (!evento) {
      throw new NotFoundException(`Evento with ID ${id} not found`);
    }

    return evento;
  }
}
