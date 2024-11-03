import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ClientesService } from './cliente.service';
import { Cliente } from './entities/cliente.entity';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Get()
  findAll(): Promise<Cliente[]> {
    return this.clientesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Cliente> {
    return this.clientesService.findOne(+id);
  }

  @Post()
  create(@Body() cliente: Cliente): Promise<Cliente> {
    return this.clientesService.create(cliente);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.clientesService.remove(+id);
  }
}
