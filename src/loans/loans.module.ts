import { Module } from "@nestjs/common";
import { LoansController } from "./api/loans.controller";
import { CreateLoanUseCase } from "./application/use-cases/create-loan.use-case";
import { GetLoanUseCase } from "./application/use-cases/get-loan.use-case";
import { ListLoansUseCase } from "./application/use-cases/list-loans.use-case";
import { ReturnLoanUseCase } from "./application/use-cases/return-loan.use-case";
import { LoanPrismaRepository } from "./infrastructure/repositories/loan.prisma.repository";
import { BookPrismaRepository } from "../books/infrastructure/repositories/book.prisma.repository";

const PRISMA_LOAN_REPOSITORY = "PRISMA_LOAN_REPOSITORY";
const PRISMA_BOOK_REPOSITORY = "PRISMA_BOOK_REPOSITORY";

@Module({
  controllers: [LoansController],
  providers: [
    CreateLoanUseCase,
    GetLoanUseCase,
    ListLoansUseCase,
    ReturnLoanUseCase,
    {
      provide: PRISMA_LOAN_REPOSITORY,
      useClass: LoanPrismaRepository,
    },
    {
      provide: PRISMA_BOOK_REPOSITORY,
      useClass: BookPrismaRepository,
    },
  ],
})
export class LoansModule {}