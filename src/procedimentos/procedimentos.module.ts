import { Module } from '@nestjs/common';
import { ProcedimentosController } from './procedimentos.controller';
import { ProcedimentosService } from './procedimentos.service';
import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [ProcedimentosController],
  providers: [ProcedimentosService, PrismaService],
})
export class ProcedimentosModule {}