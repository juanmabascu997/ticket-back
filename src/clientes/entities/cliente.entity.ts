import { Evento } from 'src/eventos/entities/evento.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import * as crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const key = Buffer.from("32", 'hex'); // Ensure the key is a 32-byte buffer
const iv = crypto.randomBytes(16);
const encryptionKey = '12345678901234567890123456789012'; // 32 caracteres

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

  @Column({
    default: null,
    transformer: {
      to: (value: string) => encrypt(value),
      from: (value: string) => decrypt(value),
    },
  })
  refresh_token: string;

  @Column({
    default: null,
    transformer: {
      to: (value: string) => encrypt(value),
      from: (value: string) => decrypt(value),
    },
  })
  access_token: string;

  @Column()
  direccion: string;

  @OneToMany(() => Evento, (evento) => evento.cliente)
  eventos: Evento[];
}

function encrypt(text: string): string {
  if(!text) return "";
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

function decrypt(text: string): string {
  if(!text) return "";
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encrypted = textParts.join(':'); 
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;

}