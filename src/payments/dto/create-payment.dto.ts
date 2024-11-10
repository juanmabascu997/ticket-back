import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  paymentId: string;

  @IsNotEmpty()
  eventoId: number;

  @IsNotEmpty()
  inscriptoId: number;
}
