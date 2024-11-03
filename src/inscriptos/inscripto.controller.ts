import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    NotFoundException,
  } from '@nestjs/common';
  import { InscriptoService } from './inscripto.service';
  import { CreateInscriptoDto } from './dto/create-inscripto.dto';
  import { UpdateInscriptoDto } from './dto/update-inscripto.dto';
  
  @Controller('inscriptos')
  export class InscriptoController {
    constructor(private readonly inscriptoService: InscriptoService) {}
  
    @Post()
    async create(@Body() createInscriptoDto: CreateInscriptoDto) {
      return await this.inscriptoService.create(createInscriptoDto);
    }
  
    @Get()
    async findAll() {
      return await this.inscriptoService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: number) {
      const inscripto = await this.inscriptoService.findOne(id);
      if (!inscripto) {
        throw new NotFoundException(`Inscripto with ID ${id} not found`);
      }
      return inscripto;
    }
  
    @Patch(':id')
    async update(
      @Param('id') id: number,
      @Body() updateInscriptoDto: UpdateInscriptoDto,
    ) {
      return await this.inscriptoService.update(id, updateInscriptoDto);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: number) {
      return await this.inscriptoService.remove(id);
    }
  }
  