import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateClienteDto } from '../dtos/create-cliente.dto';

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

    findOne(id: number) {
        return this.prisma.cliente.findUnique({
            where: { id },
        });
    }
}