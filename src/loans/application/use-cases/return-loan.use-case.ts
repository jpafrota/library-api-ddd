import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import type { ILoanRepository } from "../../domain/interfaces/iloan.repository";
import type { IBookRepository } from "../../../books/domain/interfaces/ibook.repository";
import { LoanResponseDto } from "../dtos/loan-response.dto";

@Injectable()
export class ReturnLoanUseCase {
  constructor(
    @Inject("PRISMA_LOAN_REPOSITORY") private readonly loanRepository: ILoanRepository,
    @Inject("PRISMA_BOOK_REPOSITORY") private readonly bookRepository: IBookRepository,
  ) {}

  async execute(loanId: string): Promise<LoanResponseDto> {
    const loan = await this.loanRepository.findById(loanId);
    
    if (!loan) {
      throw new NotFoundException(`Loan with ID ${loanId} not found`);
    }

    const book = await this.bookRepository.findById(loan.bookId);
    
    if (!book) {
      throw new NotFoundException(`Book with ID ${loan.bookId} not found`);
    }

    loan.returnBook();
    book.increaseAvailableQuantity();
    
    await this.loanRepository.save(loan);
    await this.bookRepository.save(book);

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