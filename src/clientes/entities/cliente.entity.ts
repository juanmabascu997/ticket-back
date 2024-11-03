import { Evento } from 'src/eventos/entities/evento.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  telefono: string;

  @Column({ default: true })
  activo: boolean;

  @Column({ default: null })
  refresh_token: string;

  @Column({ default: null })
  access_token: string;

  @Column()
  direccion: string;

  @OneToMany(() => Evento, (evento) => evento.cliente)
  eventos: Evento[];
}
