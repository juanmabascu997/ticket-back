// src/payments/payments.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsService } from './payment.service';
import { PaymentsController } from './payment.controller';
import { Payment } from './entities/payment.entity';
import { Evento } from '../eventos/entities/evento.entity';
import { Inscripto } from '../inscriptos/entities/inscripto.entity';
import { Cliente } from 'src/clientes/entities/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Evento, Inscripto, Cliente])],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
