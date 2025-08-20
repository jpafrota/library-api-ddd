import { Injectable, Inject } from "@nestjs/common";
import type { ILoanRepository } from "../../domain/interfaces/iloan.repository";
import { LoanResponseDto } from "../dtos/loan-response.dto";

@Injectable()
export class ListLoansUseCase {
  constructor(
    @Inject("PRISMA_LOAN_REPOSITORY") private readonly loanRepository: ILoanRepository,
  ) {}

  async execute(): Promise<LoanResponseDto[]> {
    const loans = await this.loanRepository.findAll();

    return loans.map(
      (loan) =>
        new LoanResponseDto(
          loan.id,
          loan.bookId,
          loan.loanDate,
          loan.returnDate,
          loan.status,
          loan.createdAt,
          loan.updatedAt,
        ),
    );
  }
}