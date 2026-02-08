import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface payloadForm {
  sub: string | number
  username: string
}


//“Como eu valido um token JWT que chega numa requisição?”
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET!, 
    });
  }

  async validate(payload: payloadForm) {
    return { userId: payload.sub, username: payload.username };
  }
}
