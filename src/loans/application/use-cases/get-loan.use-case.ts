import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import type { ILoanRepository } from "../../domain/interfaces/iloan.repository";
import { LoanResponseDto } from "../dtos/loan-response.dto";

@Injectable()
export class GetLoanUseCase {
  constructor(
    @Inject("PRISMA_LOAN_REPOSITORY") private readonly loanRepository: ILoanRepository,
  ) {}

  async execute(id: string): Promise<LoanResponseDto> {
    const loan = await this.loanRepository.findById(id);

    if (!loan) {
      throw new NotFoundException(`Loan with ID ${id} not found`);
    }

    return new LoanResponseDto(
      loan.id,
      loan.bookId,
      loan.loanDate,
      loan.returnDate,
      loan.status,
      loan.createdAt,
      loan.updatedAt,
    );
  }
}