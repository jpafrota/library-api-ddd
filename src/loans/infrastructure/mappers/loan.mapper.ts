import { Loan as PrismaLoan, LoanStatus as PrismaLoanStatus } from "@prisma/client";
import { Loan, LoanStatus } from "../../domain/entities/loan.entity";

export class LoanMapper {
  static toDomain(prismaLoan: PrismaLoan): Loan {
    return new Loan(
      prismaLoan.id,
      prismaLoan.bookId,
      prismaLoan.loanDate,
      prismaLoan.returnDate,
      this.mapStatusToDomain(prismaLoan.status),
      prismaLoan.createdAt,
      prismaLoan.updatedAt,
    );
  }

  static toPrisma(loan: Loan) {
    return {
      id: loan.id,
      bookId: loan.bookId,
      loanDate: loan.loanDate,
      returnDate: loan.returnDate,
      status: this.mapStatusToPrisma(loan.status),
      createdAt: loan.createdAt,
      updatedAt: loan.updatedAt,
    };
  }

  private static mapStatusToDomain(prismaStatus: PrismaLoanStatus): LoanStatus {
    switch (prismaStatus) {
      case PrismaLoanStatus.ACTIVE:
        return LoanStatus.ACTIVE;
      case PrismaLoanStatus.RETURNED:
        return LoanStatus.RETURNED;
      default:
        throw new Error("Unknown loan status");
    }
  }

  private static mapStatusToPrisma(domainStatus: LoanStatus): PrismaLoanStatus {
    switch (domainStatus) {
      case LoanStatus.ACTIVE:
        return PrismaLoanStatus.ACTIVE;
      case LoanStatus.RETURNED:
        return PrismaLoanStatus.RETURNED;
      default:
        throw new Error("Unknown loan status");
    }
  }
}