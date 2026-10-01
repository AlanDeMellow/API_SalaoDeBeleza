import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from '../dtos/create-cliente.dto';
import { UpdateClienteDto } from '../dtos/update-cliente.dto';

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

    //Utilizei Patch para realizar um update dos dados, assim não é necessário passar por parametro todos os dados novamente.
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() data: UpdateClienteDto,
    ) {
        return this.clientesService.update(Number(id), data);
    }
}