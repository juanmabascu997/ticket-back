import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventoService } from './evento.service';
import { EventoController } from './evento.controller';
import { Evento } from './entities/evento.entity';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Inscripto } from 'src/inscriptos/entities/inscripto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Evento, Cliente, Inscripto])],
  providers: [EventoService],
  controllers: [EventoController],
})
export class EventoModule {}
