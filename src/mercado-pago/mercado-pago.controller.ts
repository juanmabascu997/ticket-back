// mercado-pago.controller.ts

import { Controller, Get, Post, Body, Query, Req } from '@nestjs/common';
import { MercadoPagoService } from './mercado-pago.service';
import { CreatePaymentLinkDto } from 'src/dtos/create-payment-link.dto';

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

    @Get('refresh-token')
    async refreshToken(@Query('code') code: string) {
        const refreshAccessTokenResponse = await this.mercadoPagoService.refreshToken(code);
        return refreshAccessTokenResponse;
    }
    
    @Post('crear-link-pago')
    async crearLinkPago(@Body() createPaymentLinkDto: CreatePaymentLinkDto, @Req() req) {
        const { nombreCompleto, descripcion, precio, email, area_code, number, eventoId } = createPaymentLinkDto;
        req.session.eventoId = eventoId;
        req.session.inscriptoEmail = email;
        const paymentLink = await this.mercadoPagoService.createPaymentLink(nombreCompleto, descripcion, precio, email, area_code, number, eventoId);
        return paymentLink;
    }
}
