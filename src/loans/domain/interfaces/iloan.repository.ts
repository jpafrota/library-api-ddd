import { Loan } from "../entities/loan.entity";

export interface ILoanRepository {
  findById(id: string): Promise<Loan | null>;
  findAll(): Promise<Loan[]>;
  findByBookId(bookId: string): Promise<Loan[]>;
  findActiveLoansByBookId(bookId: string): Promise<Loan[]>;
  save(loan: Loan): Promise<void>;
  delete(id: string): Promise<void>;
}