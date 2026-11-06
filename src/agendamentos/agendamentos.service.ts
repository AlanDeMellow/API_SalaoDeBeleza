import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateAgendamentoDto } from '../dtos/create-agendamento.dto';
import { UpdateAgendamentoDto } from '../dtos/update-agendamento.dto';

@Injectable()
export class AgendamentosService {
    constructor(private prisma: PrismaService) { }

    // Para criar um agendamento é necessário verificar
    // se o cliente e o procedimento existem

    async create(
        data: CreateAgendamentoDto,
        user: any,
    ) {
        let clienteId = data.clienteId;

        if (user.role === 'CLIENTE') {
            const clienteUsuario = await this.prisma.cliente.findUnique({
                where: {
                    userId: user.sub,
                },
            });

            if (!clienteUsuario) {
                throw new NotFoundException(
                    'Cliente não encontrado para este usuário',
                );
            }

            clienteId = clienteUsuario.id;
        }

        // Verifica se o cliente existe.
        const cliente = await this.prisma.cliente.findUnique({
            where: {
                id: clienteId,
            },
        });

        if (!cliente) {
            throw new NotFoundException(
                'Cliente não encontrado',
            );
        }

        // Verifica se o procedimento existe.
        const procedimento = await this.prisma.procedimento.findUnique({
            where: {
                id: data.procedimentoId,
            },
        });

        if (!procedimento) {
            throw new NotFoundException(
                'Procedimento não encontrado',
            );
        }

        // dataHora está como DateTime no Prisma,
        // então é necessário converter para Date.
        return this.prisma.agendamento.create({
            data: {
                clienteId: clienteId,
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
      O GET retorna também os dados do cliente e procedimento
      através do include e organiza pela data do agendamento.
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

    // Retorna somente os agendamentos do cliente logado.
    async findByUserId(userId: number) {
        const cliente = await this.prisma.cliente.findUnique({
            where: {
                userId,
            },
        });

        if (!cliente) {
            throw new NotFoundException(
                'Cliente não encontrado para este usuário',
            );
        }

        return this.prisma.agendamento.findMany({
            where: {
                clienteId: cliente.id,
            },

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
            where: {
                id,
            },

            include: {
                cliente: true,
                procedimento: true,
            },
        });

        if (!agendamento) {
            throw new NotFoundException(
                'Agendamento não encontrado',
            );
        }

        return agendamento;
    }

    async update(
        id: number,
        data: UpdateAgendamentoDto,
    ) {
        await this.findOne(id);

        if (data.clienteId) {
            const cliente = await this.prisma.cliente.findUnique({
                where: {
                    id: data.clienteId,
                },
            });

            if (!cliente) {
                throw new NotFoundException(
                    'Cliente não encontrado',
                );
            }
        }

        if (data.procedimentoId) {
            const procedimento = await this.prisma.procedimento.findUnique({
                where: {
                    id: data.procedimentoId,
                },
            });

            if (!procedimento) {
                throw new NotFoundException(
                    'Procedimento não encontrado',
                );
            }
        }

        return this.prisma.agendamento.update({
            where: {
                id,
            },

            data: {
                clienteId: data.clienteId,
                procedimentoId: data.procedimentoId,

                // Se uma nova data for enviada,
                // fazemos a conversão para Date.
                dataHora: data.dataHora
                    ? new Date(data.dataHora)
                    : undefined,

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
            where: {
                id,
            },
        });
    }

    // Cancela somente um agendamento pertencente
    // ao cliente autenticado.
    async cancelarDoCliente(
        userId: number,
        agendamentoId: number,
    ) {
        const cliente = await this.prisma.cliente.findUnique({
            where: {
                userId,
            },
        });

        if (!cliente) {
            throw new NotFoundException(
                'Cliente não encontrado para este usuário',
            );
        }

        const agendamento = await this.prisma.agendamento.findFirst({
            where: {
                id: agendamentoId,
                clienteId: cliente.id,
            },
        });

        if (!agendamento) {
            throw new NotFoundException(
                'Agendamento não encontrado para este cliente',
            );
        }

        return this.prisma.agendamento.update({
            where: {
                id: agendamentoId,
            },

            data: {
                status: 'CANCELADO',
            },

            include: {
                cliente: true,
                procedimento: true,
            },
        });
    }
}