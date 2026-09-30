import { IsEmail, IsString, IsOptional } from 'class-validator';

export class CreateClienteDto {
    @IsString()
    nome!: string;

    @IsString()
    telefone!: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    observacoes?: string;
}