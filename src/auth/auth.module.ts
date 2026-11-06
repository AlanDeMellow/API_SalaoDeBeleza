import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';

import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    ConfigModule,
    UsersModule,

    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        secret: cfg.get('JWT_SECRET') || 'dev-secret',
        signOptions: {
          expiresIn: '1d',
        },
      }),
    }),
  ],

  providers: [
    AuthService,

    // Primeiro valida o token JWT e cria req.user
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },

    // Depois verifica a role do usuário
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],

  controllers: [
    AuthController,
  ],

  exports: [
    JwtModule,
  ],
})
export class AuthModule {}