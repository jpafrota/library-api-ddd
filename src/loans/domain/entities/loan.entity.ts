import { DomainException } from "../../../shared/exceptions/domain.exception";

export enum LoanStatus {
  ACTIVE = "ACTIVE",
  RETURNED = "RETURNED",
}

export class Loan {
  constructor(
    private readonly _id: string,
    private readonly _bookId: string,
    private readonly _loanDate: Date = new Date(),
    private _returnDate: Date | null = null,
    private _status: LoanStatus = LoanStatus.ACTIVE,
    private readonly _createdAt: Date = new Date(),
    private _updatedAt: Date = new Date(),
  ) {
    this.validateBookId();
    this.validateStatus();
  }

  get id(): string {
    return this._id;
  }

  get bookId(): string {
    return this._bookId;
  }

  get loanDate(): Date {
    return this._loanDate;
  }

  get returnDate(): Date | null {
    return this._returnDate;
  }

  get status(): LoanStatus {
    return this._status;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  public isActive(): boolean {
    return this._status === LoanStatus.ACTIVE;
  }

  public isReturned(): boolean {
    return this._status === LoanStatus.RETURNED;
  }

  public canBeReturned(): boolean {
    return this._status === LoanStatus.ACTIVE;
  }

  public returnBook(): void {
    if (!this.canBeReturned()) {
      throw new DomainException("Cannot return a loan that is not active");
    }

    this._status = LoanStatus.RETURNED;
    this._returnDate = new Date();
    this._updatedAt = new Date();
  }

  private validateBookId(): void {
    if (!this._bookId || this._bookId.trim().length === 0) {
      throw new DomainException("Book ID is required for loan");
    }
  }

  private validateStatus(): void {
    if (this._status === LoanStatus.RETURNED && !this._returnDate) {
      throw new DomainException("Return date is required for returned loans");
    }

    if (this._status === LoanStatus.ACTIVE && this._returnDate) {
      throw new DomainException("Active loans cannot have a return date");
    }
  }
}