import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { AgendamentosService } from './agendamentos.service';
import { CreateAgendamentoDto } from '../dtos/create-agendamento.dto';
import { UpdateAgendamentoDto } from '../dtos/update-agendamento.dto';

@Controller('agendamentos')
export class AgendamentosController {
  constructor(
    private readonly agendamentosService: AgendamentosService,
  ) {}

  @Post()
  create(@Body() data: CreateAgendamentoDto) {
    return this.agendamentosService.create(data);
  }

  @Get()
  findAll() {
    return this.agendamentosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agendamentosService.findOne(Number(id));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateAgendamentoDto,
  ) {
    return this.agendamentosService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agendamentosService.remove(Number(id));
  }
}