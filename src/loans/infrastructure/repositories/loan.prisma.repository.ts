import { Injectable } from "@nestjs/common";
import { Loan } from "../../domain/entities/loan.entity";
import type { ILoanRepository } from "../../domain/interfaces/iloan.repository";
import { PrismaService } from "../../../shared/database/prisma.service";
import { LoanMapper } from "../mappers/loan.mapper";

@Injectable()
export class LoanPrismaRepository implements ILoanRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Loan | null> {
    const loan = await this.prisma.loan.findUnique({
      where: { id },
    });

    return loan ? LoanMapper.toDomain(loan) : null;
  }

  async findAll(): Promise<Loan[]> {
    const loans = await this.prisma.loan.findMany({
      orderBy: { createdAt: "desc" },
    });

    return loans.map((loan) => LoanMapper.toDomain(loan));
  }

  async findByBookId(bookId: string): Promise<Loan[]> {
    const loans = await this.prisma.loan.findMany({
      where: { bookId },
      orderBy: { createdAt: "desc" },
    });

    return loans.map((loan) => LoanMapper.toDomain(loan));
  }

  async findActiveLoansByBookId(bookId: string): Promise<Loan[]> {
    const loans = await this.prisma.loan.findMany({
      where: { 
        bookId,
        status: "ACTIVE",
      },
      orderBy: { createdAt: "desc" },
    });

    return loans.map((loan) => LoanMapper.toDomain(loan));
  }

  async save(loan: Loan): Promise<void> {
    const data = LoanMapper.toPrisma(loan);

    await this.prisma.loan.upsert({
      where: { id: loan.id },
      update: data,
      create: data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.loan.delete({
      where: { id },
    });
  }
}