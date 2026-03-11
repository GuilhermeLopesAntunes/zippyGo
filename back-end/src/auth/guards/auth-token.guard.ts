import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import jwtConfig from '../config/jwt.config';
import * as config from '@nestjs/config';
import { REQUEST_TOKEN_PAYLOAD_KEY } from '../auth.constants';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: config.ConfigType<typeof jwtConfig>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Não Logado');
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
          {
            secret: this.jwtConfiguration.secret,
            audience: this.jwtConfiguration.audience,
            issuer: this.jwtConfiguration.issuer,
          }
      )

      if (!payload.email) {
        throw new UnauthorizedException('Token inválido');
      }
      const user = await this.userService.findOne(payload.sub);

      if (!user) {
        throw new UnauthorizedException('Pessoa não autorizada');
      }
      if (!user.active) {
        throw new UnauthorizedException(
          'Usuário desativado. Entre em contato com o administrador.'
        );
      }
      request[REQUEST_TOKEN_PAYLOAD_KEY] = {
        ...payload,
        user
      };
    } catch (error) {
      throw new UnauthorizedException('Falha ao logar');
    }
    return true;
  }

  extractTokenFromHeader(request: Request): string | undefined {
    const authorization = request.headers?.authorization;

    if (!authorization || typeof authorization !== 'string') {
      return;
    }
    return authorization.split(' ')[1];
  }
}