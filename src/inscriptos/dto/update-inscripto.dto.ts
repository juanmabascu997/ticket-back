import { IsOptional, IsEmail, IsString } from 'class-validator';

export class UpdateInscriptoDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  eventoId?: string;
}
