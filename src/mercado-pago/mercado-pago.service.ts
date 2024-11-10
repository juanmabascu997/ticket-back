import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import MercadoPagoConfig, { OAuth, Preference } from 'mercadopago';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Repository } from 'typeorm';
import { Evento } from 'src/eventos/entities/evento.entity';

@Injectable()
export class MercadoPagoService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,

    @InjectRepository(Evento)
    private readonly eventoRepository: Repository<Evento>,
  ) {}

  private readonly clientId = process.env.MERCADO_PAGO_CLIENT_ID;
  private readonly clientSecret = process.env.MERCADO_PAGO_CLIENT_SECRET;
  private readonly redirectUri = process.env.MERCADO_PAGO_REDIRECT_URI;

  async authorize(
    code: string,
    codeVerifier: string,
    clienteId: string,
  ): Promise<any> {
    const tokenUrl = 'https://api.mercadopago.com/oauth/token';
    const cliente = await this.clienteRepository.findOne({
      where: { id: Number(clienteId) },
    });

    if (!cliente) {
      throw new NotFoundException('Usuario no encontrado');
    }

    try {
      const response = await axios.post(tokenUrl, {
        grant_type: 'authorization_code',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code,
        redirect_uri: this.redirectUri,
        code_verifier: codeVerifier,
      });

      const { access_token, refresh_token } = response.data;
      cliente.access_token = access_token;
      cliente.refresh_token = refresh_token;
      
      await this.clienteRepository.save(cliente);

      return response;
    } catch (error) {    
      console.error(
        'Error en la autorización:',
        error.response.data || error,
      );
      throw error;
    }
  }

  async refreshToken(clienteId: string) {
    const cliente = await this.clienteRepository.findOne({
      where: { id: Number(clienteId) },
    });

    if (!cliente) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const clientMercadoPago = new MercadoPagoConfig({
      accessToken: cliente.access_token,
      options: { timeout: 5000 },
    });
  
    const oauth = new OAuth(clientMercadoPago);
  
    try {
      const result = await oauth.refresh({
        body: {
          client_secret: this.clientSecret,
          client_id: this.clientId,
          refresh_token: cliente.refresh_token,
        }
      });
      return result
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error
    }
  }
  

  async createPaymentLink(
    nombreCompleto: string,
    descripcion: string,
    precio: number,
    email: string,
    area_code: string,
    number: string,
    eventoId: number,
  ): Promise<any> {
    try {
      const evento = await this.eventoRepository.findOne({
        where: { id: eventoId },
        relations: ['cliente', 'inscriptos'],
      });

      if (!evento) {
        throw new NotFoundException(
          `No se encontro evento con el ID ${eventoId}`,
        );
      }

      const inscriptoExistente = evento.inscriptos.find(
        (inscripto) => inscripto.email == email,
      );
      
      if (inscriptoExistente) {
        throw new NotFoundException(
          `El usuario con email ${inscriptoExistente.email} ya se encuentra inscripto.`,
        );
      }
      
      const cliente = evento.cliente;

      if (!cliente) {
        throw new NotFoundException(
          `Error en cliente. No esta dado de alta en sistema.`,
        );
      }
      
      if(!cliente.access_token){
        throw new NotFoundException(
          `Error en cliente. No posee autorizacion para mercado pago.`,
        );
      }
  
      const authToken = cliente.access_token;
      const clientMP = new MercadoPagoConfig({ accessToken: authToken });
      const body = {
        items: [
          {
            id: String(eventoId),
            descripcion: email,
            title: descripcion,
            quantity: 1,
            unit_price: Number(precio),
            currency_id: 'ARS',
          },
        ],
        additional_info: email,
        metadata: inscriptoExistente,
        payer: {
          name: nombreCompleto,
          email: email,
          phone: {
            area_code: area_code,
            number: number,
          },
        },
        back_urls: {
          success: 'http://localhost:3000/payments/success/',
          failure: 'http://localhost:3000/payments/failure/',
          pending: 'http://localhost:3000/payments/pending/',
        },
        auto_return: 'approved',
      };

      const preference = await new Preference(clientMP).create({ body: body });
      return { redirectUrl: preference.init_point };
    } catch (error) {
      console.log("error", error);
      
      throw error
    }
  }
}
