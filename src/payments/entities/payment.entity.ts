// src/payments/entities/payment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Evento } from '../../eventos/entities/evento.entity';
import { Inscripto } from '../../inscriptos/entities/inscripto.entity';
import { IsString } from 'class-validator';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  paymentId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  paymentDate: Date;

  @Column({ length: 20, default: 'pending' })
  status: string;

  @ManyToOne(() => Evento, (evento) => evento.payments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'eventoId' })
  evento: Evento;

  @ManyToOne(() => Inscripto, (inscripto) => inscripto.payments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'inscriptoId' })
  inscripto: Inscripto;
}
