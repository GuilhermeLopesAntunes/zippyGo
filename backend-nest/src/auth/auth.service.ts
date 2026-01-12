import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import bcrypt from "node_modules/bcryptjs";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(username: string, name: string, password: string) {
    try {
      await this.usersService.findByUsername(username);
      throw new ConflictException('Username Já existe');
    } catch (e) {}
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersService.createBasicUser({
      fullName: name,
      username,
      password: hashedPassword,
    });

    return {
      id: user.id,
      username: user.username,
    };
  }

  async login(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Credenciais Inválidas');
    }

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
