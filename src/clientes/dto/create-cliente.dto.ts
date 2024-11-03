import { IsNotEmpty, IsEmail, IsString, IsOptional } from 'class-validator';

export class CreateClienteDto {
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    telefono?: string;

    @IsNotEmpty()
    @IsString()
    direccion: string;
}
