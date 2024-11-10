// src/payments/payments.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { PaymentsService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Response } from 'express';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  findAll() {
    console.log("ENTRA ACA?");
    return this.paymentsService.findAll();
  }

  // @Get(':id')
  // async findOneById(@Query() querys: any) {
  //   const id = "92368528021";
  //   return await this.paymentsService.findOne(+id);
  // }

  @Get('mercado-pago/:id')
  async findOneById(@Param('id') id: string) {
    const findOneInMp = await this.paymentsService.findOne(+id);
    return findOneInMp;
  }

  @Get('success')
  async create(
    @Query() querys: any,
    @Res() res: Response,
    @Req() req
  ) {
    const { payment_id, status } = querys;
    // const eventoId = req.session.eventoId;
    // const inscriptoEmail = req.session.inscriptoEmail;
    const eventoId = 1;
    const inscriptoEmail = 'fernando.rios3@example.com'
    
    if(!eventoId || !inscriptoEmail) throw new NotFoundException(`Sesión de usuario caducada...`);

    await this.paymentsService.create(payment_id, status, eventoId, inscriptoEmail);
    return res.redirect('https://www.bascu.website/');
    }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(+id);
  }
}
