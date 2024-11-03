import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private clientesRepository: Repository<Cliente>,
  ) {}

  findAll(): Promise<Cliente[]> {
    return this.clientesRepository.find({ relations: ['eventos'] });
  }

  findOne(id: number): Promise<Cliente> {
    return this.clientesRepository.findOne({ where: { id }, relations: ['eventos'] });
  }

  create(cliente: Cliente): Promise<Cliente> {
    return this.clientesRepository.save(cliente);
  }

  async remove(id: number): Promise<void> {
    await this.clientesRepository.delete(id);
  }
}
