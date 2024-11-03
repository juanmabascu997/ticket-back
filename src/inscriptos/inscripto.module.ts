import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InscriptoService } from './inscripto.service';
import { InscriptoController } from './inscripto.controller';
import { Inscripto } from './entities/inscripto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Inscripto])],
  providers: [InscriptoService],
  controllers: [InscriptoController],
})
export class InscriptoModule {}
