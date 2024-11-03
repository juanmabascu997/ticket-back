// mercado-pago.module.ts
import { Module } from '@nestjs/common';
import { MercadoPagoService } from './mercado-pago.service';
import { MercadoPagoController } from './mercado-pago.controller';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evento } from 'src/eventos/entities/evento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Evento])],
  providers: [MercadoPagoService, AuthService],
  controllers: [MercadoPagoController, AuthController],
})
export class MercadoPagoModule {}
