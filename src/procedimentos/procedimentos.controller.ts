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

@Controller('procedimentos')
export class ProcedimentosController {
  constructor(
    private readonly procedimentosService: ProcedimentosService,
  ) {}

  @Post()
  create(@Body() data: CreateProcedimentoDto) {
    return this.procedimentosService.create(data);
  }

  @Get()
  findAll() {
    return this.procedimentosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.procedimentosService.findOne(Number(id));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateProcedimentoDto,
  ) {
    return this.procedimentosService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.procedimentosService.remove(Number(id));
  }
}