import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { ClientesModule } from './clientes/clientes.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [//adicionado aqui global o configModule
    ConfigModule.forRoot({ isGlobal: true }), 
    UsersModule,
    ClientesModule, 
    ProfilesModule, 
    AuthModule], //conectar sub modulos
  controllers: [],
  providers: [],
})
export class AppModule { }
