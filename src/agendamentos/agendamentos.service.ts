import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateAgendamentoDto } from '../dtos/create-agendamento.dto';
import { UpdateAgendamentoDto } from '../dtos/update-agendamento.dto';

@Injectable()
export class AgendamentosService {
    constructor(private prisma: PrismaService) { }

    // para os agendamentos é preciso verificar se o cliente e o procedimento existe e só então criar um horario na agenda.

    async create(data: CreateAgendamentoDto) {
        const cliente = await this.prisma.cliente.findUnique({
            where: { id: data.clienteId },
        });

        if (!cliente) {
            throw new NotFoundException('Cliente não encontrado');
        }

        const procedimento = await this.prisma.procedimento.findUnique({
            where: { id: data.procedimentoId },
        });

        if (!procedimento) {
            throw new NotFoundException('Procedimento não encontrado');
        }

        // aqui deu erro pois anteriormente o DataHora estava como String e eu defini como DateTime no Schema do Prisma, então tive que fazer a conversão para Date.

        return this.prisma.agendamento.create({
            data: {
                clienteId: data.clienteId,
                procedimentoId: data.procedimentoId,
                dataHora: new Date(data.dataHora),
                observacoes: data.observacoes,
            },
            include: {
                cliente: true,
                procedimento: true,
            },
        });
    }

    /* 
     O Get estava retornando apenas os IDs, mas queria que retornasse algo mais completo,
    então usei o Include para incluir os dados dos Cliente e procedimento quando retornar,
    além de retornar em ordem ascendente pelo horario.
    */

    findAll() {
        return this.prisma.agendamento.findMany({
            include: {
                cliente: true,
                procedimento: true,
            },
            orderBy: {
                dataHora: 'asc',
            },
        });
    }

    async findOne(id: number) {
        const agendamento = await this.prisma.agendamento.findUnique({
            where: { id },
            include: {
                cliente: true,
                procedimento: true,
            },
        });

        if (!agendamento) {
            throw new NotFoundException('Agendamento não encontrado');
        }

        return agendamento;
    }

    async update(id: number, data: UpdateAgendamentoDto) {
        await this.findOne(id);

        if (data.clienteId) {
            const cliente = await this.prisma.cliente.findUnique({
                where: { id: data.clienteId },
            });

            if (!cliente) {
                throw new NotFoundException('Cliente não encontrado');
            }
        }

        if (data.procedimentoId) {
            const procedimento = await this.prisma.procedimento.findUnique({
                where: { id: data.procedimentoId },
            });

            if (!procedimento) {
                throw new NotFoundException('Procedimento não encontrado');
            }
        }

        return this.prisma.agendamento.update({
            where: { id },
            data: {
                clienteId: data.clienteId,
                procedimentoId: data.procedimentoId,
                // se foi enviado alguma data pelo Body fazemos a conversão, se não apenas mantemos como esta.
                dataHora: data.dataHora ? new Date(data.dataHora) : undefined,
                status: data.status,
                observacoes: data.observacoes,
            },
            include: {
                cliente: true,
                procedimento: true,
            },
        });
    }

    async remove(id: number) {
        await this.findOne(id);

        return this.prisma.agendamento.delete({
            where: { id },
        });
    }
}