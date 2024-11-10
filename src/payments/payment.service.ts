// src/payments/payments.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Evento } from '../eventos/entities/evento.entity';
import { Inscripto } from '../inscriptos/entities/inscripto.entity';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import axios from 'axios';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Cliente) private clienteRepository: Repository<Cliente>,
    @InjectRepository(Payment) private paymentsRepository: Repository<Payment>,
    @InjectRepository(Evento) private eventosRepository: Repository<Evento>,
    @InjectRepository(Inscripto)
    private inscriptosRepository: Repository<Inscripto>,
  ) {}

  async create(
    payment_id: string,
    status: string,
    eventoId: number,
    inscriptoEmail: string,
  ): Promise<Payment> {
    const evento = await this.eventosRepository.findOneBy({ id: eventoId });

    const inscripto = await this.inscriptosRepository.findOneBy({
      email: inscriptoEmail,
    });

    if (!evento || !inscripto) {
      throw new NotFoundException('Evento or Inscripto not found');
    }

    const payment = this.paymentsRepository.create({
      paymentId: payment_id,
      evento,
      inscripto,
      status: status,
    });

    return await this.paymentsRepository.save(payment);
  }

  findAll(): Promise<Payment[]> {
    return this.paymentsRepository.find({ relations: ['evento', 'inscripto'] });
  }

  async findOne(id: number): Promise<any> {
    const cliente = await this.clienteRepository.findOne({ where: { id: 1 } });

    if (!cliente) {
      throw new NotFoundException(`Cliente con id ${cliente.id} no encontrado`);
    }

    const authToken = cliente.access_token;

    const paymentDetails = await axios.get(
      `https://api.mercadopago.com/v1/payments/${id}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );
    const paymentData = paymentDetails.data;
    
    if (!paymentData) {
      throw new NotFoundException(`Payment with id ${id} not found`);
    }
    console.log("sigue por aca?");
    
    return paymentData;
  }

  async update(
    id: number,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    await this.paymentsRepository.update(id, updatePaymentDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.paymentsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Payment with id ${id} not found`);
    }
  }
}
