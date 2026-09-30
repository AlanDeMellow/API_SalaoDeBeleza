import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from '../dtos/create-cliente.dto';

@Controller('clientes')
export class ClientesController {
    constructor(private readonly clientesService: ClientesService) { }

    @Post()
    create(@Body() data: CreateClienteDto) {
        return this.clientesService.create(data);
    }

    @Get()
    findAll() {
        return this.clientesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.clientesService.findOne(Number(id));
    }
}