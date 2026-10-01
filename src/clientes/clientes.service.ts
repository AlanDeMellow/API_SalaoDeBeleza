import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateClienteDto } from '../dtos/create-cliente.dto';
import { UpdateClienteDto } from '../dtos/update-cliente.dto';

@Injectable()
export class ClientesService {
    constructor(private prisma: PrismaService) { }

    create(data: CreateClienteDto) {
        return this.prisma.cliente.create({
            data,
        });
    }

    findAll() {
        return this.prisma.cliente.findMany();
    }

    async findOne(id: number) {
        const cliente = await this.prisma.cliente.findUnique({
            where: { id },
        });

        if (!cliente) {
            throw new NotFoundException('Cliente não encontrado');
        }

        return cliente;
    }

    async update(id: number, data: UpdateClienteDto) {
        await this.findOne(id);

        return this.prisma.cliente.update({
            where: { id },
            data,
        });
    }

    async remove(id: number) {
        await this.findOne(id);

        return this.prisma.cliente.delete({
            where: { id },
        });
    }
}