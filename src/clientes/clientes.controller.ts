import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  Req,
} from '@nestjs/common';

import { ClientesService } from './clientes.service';
import { CreateClienteDto } from '../dtos/create-cliente.dto';
import { UpdateClienteDto } from '../dtos/update-cliente.dto';
import { Roles } from '../auth/roles.decorator';

@Controller('clientes')
export class ClientesController {
  constructor(
    private readonly clientesService: ClientesService,
  ) {}

  @Post()
  @Roles('ADMIN')
  create(@Body() data: CreateClienteDto) {
    return this.clientesService.create(data);
  }

  @Get()
  @Roles('ADMIN')
  findAll() {
    return this.clientesService.findAll();
  }

  @Get('me')
  findMe(@Req() req: any) {
    return this.clientesService.findByUserId(req.user.sub);
  }

  @Get(':id')
  @Roles('ADMIN')
  findOne(@Param('id') id: string) {
    return this.clientesService.findOne(Number(id));
  }

  @Patch(':id')
  @Roles('ADMIN')
  update(
    @Param('id') id: string,
    @Body() data: UpdateClienteDto,
  ) {
    return this.clientesService.update(
      Number(id),
      data,
    );
  }

  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.clientesService.remove(
      Number(id),
    );
  }
}