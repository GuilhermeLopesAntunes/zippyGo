import { RoutePolices } from '../enum/route-policies.enum';

export class TokenPayloadDto {
  sub: string;
  email: string;
  routePolicies: RoutePolices;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}