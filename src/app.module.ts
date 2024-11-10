import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MercadoPagoModule } from './mercado-pago/mercado-pago.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientesModule } from './clientes/cliente.module';
import { EventoModule } from './eventos/evento.module';
import { InscriptoModule } from './inscriptos/inscripto.module';
import { DatabaseModule } from './database/database.module';
import { CommonModule } from './common/common.module';
import { PaymentsModule } from './payments/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MercadoPagoModule,
    ClientesModule,
    EventoModule,
    InscriptoModule,
    PaymentsModule,
    DatabaseModule,
    CommonModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

