import { Evento } from '../../eventos/entities/evento.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

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
}
