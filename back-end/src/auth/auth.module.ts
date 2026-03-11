import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { Global } from '@nestjs/common';
@Global()
@Module({
  imports: [
    UsersModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    PrismaModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [{
      provide: HashingService,
      useClass: BcryptService,
    },
    AuthService,],
  exports: [HashingService, JwtModule, ConfigModule],
})
export class AuthModule {}
