import { LoanStatus } from "../../domain/entities/loan.entity";

export class LoanResponseDto {
  constructor(
    public readonly id: string,
    public readonly bookId: string,
    public readonly loanDate: Date,
    public readonly returnDate: Date | null,
    public readonly status: LoanStatus,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}