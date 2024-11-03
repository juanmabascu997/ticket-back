import { IsNotEmpty, IsString, IsDate, IsInt, IsNumber, IsArray, IsEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEventoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsString()
  ubicacion: string;

  @IsNotEmpty()
  @IsArray()
  categorias: Array<string>;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  fecha: Date;

  @IsNotEmpty()
  @IsNumber()
  precio: Number;

  @IsNotEmpty()
  @IsInt()
  clienteId: number;

  @IsEmpty()
  @IsArray()
  inscriptoIds?: number[];
}
