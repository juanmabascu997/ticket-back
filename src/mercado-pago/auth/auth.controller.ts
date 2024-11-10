import { Controller, Get, Query, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('mercado-pago/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('generate-code')
    async generateCodeChallenge() {
        const { codeVerifier, codeChallenge } = await this.authService.generateCodeChallenge();
        return { codeVerifier, codeChallenge };
    }

    @Get('authorize')
    async authorize(@Req() req, @Query('clienteId') clienteId: string) {
        const { codeVerifier, codeChallenge } = await this.authService.generateCodeChallenge();
        req.session.codeVerifier = codeVerifier;
        req.session.clienteId = clienteId;
        console.log(req.session);
        
        const redirectUri = process.env.MERCADO_PAGO_REDIRECT_URI; 
        const clientMPId = process.env.MERCADO_PAGO_CLIENT_ID;
        const codeChallengeMethod = 'S256';

        const authorizationUrl = `https://auth.mercadopago.com/authorization?response_type=code&client_id=${clientMPId}&redirect_uri=${redirectUri}&code_challenge=${codeChallenge}&code_challenge_method=${codeChallengeMethod}`;

        return { authorizationUrl };
    }
}
