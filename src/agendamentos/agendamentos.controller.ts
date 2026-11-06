import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';

import { AgendamentosService } from './agendamentos.service';
import { CreateAgendamentoDto } from '../dtos/create-agendamento.dto';
import { UpdateAgendamentoDto } from '../dtos/update-agendamento.dto';
import { Roles } from '../auth/roles.decorator';

@Controller('agendamentos')
export class AgendamentosController {
  constructor(
    private readonly agendamentosService: AgendamentosService,
  ) { }

  @Post()
  @Roles('ADMIN', 'CLIENTE')
  create(
    @Req() req: any,
    @Body() data: CreateAgendamentoDto,
  ) {
    return this.agendamentosService.create(
      data,
      req.user,
    );
  }

  @Get()
  @Roles('ADMIN')
  findAll() {
    return this.agendamentosService.findAll();
  }

  @Get('me')
  @Roles('CLIENTE')
  findMyAppointments(@Req() req: any) {
    return this.agendamentosService.findByUserId(req.user.sub);
  }

  @Patch('me/:id/cancelar')
  @Roles('CLIENTE')
  cancelarMeuAgendamento(
    @Req() req: any,
    @Param('id') id: string,
  ) {
    return this.agendamentosService.cancelarDoCliente(
      req.user.sub,
      Number(id),
    );
  }

  @Get(':id')
  @Roles('ADMIN')
  findOne(@Param('id') id: string) {
    return this.agendamentosService.findOne(Number(id));
  }

  @Patch(':id')
  @Roles('ADMIN')
  update(
    @Param('id') id: string,
    @Body() data: UpdateAgendamentoDto,
  ) {
    return this.agendamentosService.update(
      Number(id),
      data,
    );
  }

  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.agendamentosService.remove(
      Number(id),
    );
  }
}