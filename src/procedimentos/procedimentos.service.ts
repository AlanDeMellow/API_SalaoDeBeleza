import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateProcedimentoDto } from '../dtos/create-procedimento.dto';
import { UpdateProcedimentoDto } from '../dtos/update-procedimento.dto';

@Injectable()
export class ProcedimentosService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateProcedimentoDto) {
    return this.prisma.procedimento.create({
      data,
    });
  }

  findAll() {
    return this.prisma.procedimento.findMany();
  }

  async findOne(id: number) {
    const procedimento = await this.prisma.procedimento.findUnique({
      where: { id },
    });

    if (!procedimento) {
      throw new NotFoundException('Procedimento não encontrado');
    }

    return procedimento;
  }

  async update(id: number, data: UpdateProcedimentoDto) {
    await this.findOne(id);

    return this.prisma.procedimento.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.procedimento.delete({
      where: { id },
    });
  }
}