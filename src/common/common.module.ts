import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evento } from 'src/eventos/entities/evento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Evento])],
  providers: [CommonService]
})
export class CommonModule {}
