import {
  IsInt,
  IsISO8601,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAgendamentoDto {
  @IsInt()
  clienteId!: number;

  @IsInt()
  procedimentoId!: number;

  //valida se a hora esta no formato certo
  @IsISO8601()
  dataHora!: string;

  @IsOptional()
  @IsString()
  observacoes?: string;
}