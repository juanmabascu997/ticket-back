// mercado-pago.controller.ts

import { Controller, Get, Post, Body, Query, Req } from '@nestjs/common';
import { MercadoPagoService } from './mercado-pago.service';
import { CreatePaymentLinkDto } from 'src/dtos/create-payment-link.dto';
import { randomUUID } from 'crypto';

@Controller('mercado-pago')
export class MercadoPagoController {
    constructor(private readonly mercadoPagoService: MercadoPagoService) {}

    @Get('authorize')
    async handleCallback(@Query('code') code: string, @Req() req) {
        const codeVerifier = req.session.codeVerifier;
        const clienteId = req.session.clienteId;
        
        const accessTokenResponse = await this.mercadoPagoService.authorize(code, codeVerifier, clienteId);
        return accessTokenResponse;
    }


    @Post('crear-link-pago')
    async crearLinkPago(@Body() createPaymentLinkDto: CreatePaymentLinkDto) {
        const { nombreCompleto, descripcion, precio, email, area_code, number, eventoId } = createPaymentLinkDto;
        const paymentLink = await this.mercadoPagoService.createPaymentLink(nombreCompleto, descripcion, precio, email, area_code, number, eventoId);
        return paymentLink;
    }
}
