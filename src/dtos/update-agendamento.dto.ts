import {
  IsInt,
  IsISO8601,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateAgendamentoDto {
  @IsOptional()
  @IsInt()
  clienteId?: number;

  @IsOptional()
  @IsInt()
  procedimentoId?: number;

  @IsOptional()
  @IsISO8601()
  dataHora?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  observacoes?: string;
}