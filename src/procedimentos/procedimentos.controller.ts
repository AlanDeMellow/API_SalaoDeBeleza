import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ProcedimentosService } from './procedimentos.service';
import { CreateProcedimentoDto } from '../dtos/create-procedimento.dto';
import { UpdateProcedimentoDto } from '../dtos/update-procedimento.dto';
import { Roles } from '../auth/roles.decorator';

@Controller('procedimentos')
export class ProcedimentosController {
  constructor(
    private readonly procedimentosService: ProcedimentosService,
  ) {}

  @Post()
  @Roles('ADMIN')
  create(@Body() data: CreateProcedimentoDto) {
    return this.procedimentosService.create(data);
  }

  @Get()
  @Roles('ADMIN', 'CLIENTE')
  findAll() {
    return this.procedimentosService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN', 'CLIENTE')
  findOne(@Param('id') id: string) {
    return this.procedimentosService.findOne(Number(id));
  }

  @Patch(':id')
  @Roles('ADMIN')
  update(
    @Param('id') id: string,
    @Body() data: UpdateProcedimentoDto,
  ) {
    return this.procedimentosService.update(
      Number(id),
      data,
    );
  }

  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.procedimentosService.remove(
      Number(id),
    );
  }
}