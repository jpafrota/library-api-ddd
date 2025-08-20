import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { uuidv7 } from "uuidv7";
import { Loan } from "../../domain/entities/loan.entity";
import type { ILoanRepository } from "../../domain/interfaces/iloan.repository";
import type { IBookRepository } from "../../../books/domain/interfaces/ibook.repository";
import { CreateLoanDto } from "../dtos/create-loan.dto";
import { LoanResponseDto } from "../dtos/loan-response.dto";
import { DomainException } from "../../../shared/exceptions/domain.exception";

@Injectable()
export class CreateLoanUseCase {
  constructor(
    @Inject("PRISMA_LOAN_REPOSITORY") private readonly loanRepository: ILoanRepository,
    @Inject("PRISMA_BOOK_REPOSITORY") private readonly bookRepository: IBookRepository,
  ) {}

  async execute(createLoanDto: CreateLoanDto): Promise<LoanResponseDto> {
    const book = await this.bookRepository.findById(createLoanDto.bookId);
    
    if (!book) {
      throw new NotFoundException(`Book with ID ${createLoanDto.bookId} not found`);
    }

    if (!book.canBeLoanedTo()) {
      throw new DomainException("No copies available for loan");
    }

    const loan = new Loan(
      uuidv7(),
      createLoanDto.bookId,
    );

    book.decreaseAvailableQuantity();
    
    await this.bookRepository.save(book);
    await this.loanRepository.save(loan);

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