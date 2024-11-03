import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evento } from './entities/evento.entity';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Inscripto } from 'src/inscriptos/entities/inscripto.entity';

@Injectable()
export class EventoService {
  constructor(
    @InjectRepository(Evento)
    private eventoRepository: Repository<Evento>,

    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,

    @InjectRepository(Inscripto)
    private inscriptoRepository: Repository<Inscripto>,
  ) {}

  async create(createEventoDto: CreateEventoDto) {
    const { clienteId, ...eventData } = createEventoDto;

    const cliente = await this.clienteRepository.findOne({ where: { id: clienteId } });
    if (!cliente) {
      throw new NotFoundException(`Cliente with ID ${clienteId} not found`);
    }

    const evento = this.eventoRepository.create({
      ...eventData,
      cliente,
    });

    return this.eventoRepository.save(evento);
  }

  findAll() {
    return this.eventoRepository.find({ relations: ['cliente', 'inscriptos'] });
  }

  async findOne(id: number) {
    const evento = await this.eventoRepository.findOne({
      where: { id },
      relations: ['cliente', 'inscriptos'],
    });
    
    if (!evento) {
      throw new NotFoundException(`Evento with ID ${id} not found`);
    }

    return evento;
  }
  update(id: number, updateEventoDto: UpdateEventoDto) {
    return this.eventoRepository.update(id, updateEventoDto);
  }

  remove(id: number) {
    return this.eventoRepository.delete(id);
  }

  async inscribir(eventoId: number, inscriptoId: number) {
    const evento = await this.eventoRepository.findOne({
      where: { id: eventoId },
      relations: ['inscriptos'],
    });
    
    if (!evento) {
      throw new NotFoundException(`Evento with ID ${eventoId} not found`);
    }

    const inscripto = await this.inscriptoRepository.findOne({ where: { id: inscriptoId } });
    if (!inscripto) {
      throw new NotFoundException(`Inscripto with ID ${inscriptoId} not found`);
    }

    const isAlreadyRegistered = evento.inscriptos.some(
      (existingInscripto) => existingInscripto.id === inscripto.id,
    );
    if (isAlreadyRegistered) {
      throw new Error(`Inscripto with ID ${inscriptoId} is already registered for Evento ${eventoId}`);
    }

    evento.inscriptos.push(inscripto);
    return this.eventoRepository.save(evento);
  }

}
