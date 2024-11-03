import { IsNotEmpty, IsEmail, IsNumber, IsString } from 'class-validator';

export class CreatePaymentLinkDto {
    @IsNumber()
    @IsNotEmpty()
    precio: number;

    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    area_code: string;

    @IsString()
    @IsNotEmpty()
    number: string;

    @IsString()
    @IsNotEmpty()
    nombreCompleto: string;

    @IsNumber()
    @IsNotEmpty()
    eventoId: number;
}
