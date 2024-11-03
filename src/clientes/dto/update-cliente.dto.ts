import { IsOptional, IsEmail, IsString, IsBoolean } from 'class-validator';

export class UpdateClienteDto {
    @IsOptional()
    @IsString()
    nombre?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    telefono?: string;

    @IsOptional()
    @IsString()
    refresh_token?: string;

    @IsOptional()
    @IsString()
    access_token?: string;

    @IsOptional()
    @IsBoolean()
    activo?: boolean;
}
