// eventos.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Inscripto } from '../../inscriptos/entities/inscripto.entity';
import { Payment } from 'src/payments/entities/payment.entity';

@Entity()
export class Evento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  fecha: Date;

  @Column()
  ubicacion: string;

  @ManyToOne(() => Cliente, (cliente) => cliente.eventos)
  cliente: Cliente;

  @ManyToMany(() => Inscripto, (inscripto) => inscripto.eventos)
  @JoinTable()
  inscriptos: Inscripto[];

  @OneToMany(() => Payment, (payment) => payment.evento)
  payments: Payment[];
}
