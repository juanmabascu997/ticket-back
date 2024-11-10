import { Payment } from 'src/payments/entities/payment.entity';
import { Evento } from '../../eventos/entities/evento.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm';

@Entity()
export class Inscripto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  telefono: string;

  @Column()
  direccion: string;

  @ManyToMany(() => Evento, (evento) => evento.inscriptos)
  eventos: Evento[];

  @OneToMany(() => Payment, (payment) => payment.inscripto)
  payments: Payment[];
}
