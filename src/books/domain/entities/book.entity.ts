import { DomainException } from "../../../shared/exceptions/domain.exception";

export class Book {
  constructor(
    private readonly _id: string,
    private _title: string,
    private _author: string,
    private _publicationYear: number,
    private _availableQuantity: number,
    private readonly _createdAt: Date = new Date(),
    private _updatedAt: Date = new Date(),
  ) {
    this.validateTitle();
    this.validateAuthor();
    this.validateQuantity();
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get author(): string {
    return this._author;
  }

  get publicationYear(): number {
    return this._publicationYear;
  }

  get availableQuantity(): number {
    return this._availableQuantity;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  public canBeLoanedTo(): boolean {
    return this._availableQuantity > 0;
  }

  public decreaseAvailableQuantity(): void {
    if (!this.canBeLoanedTo()) {
      throw new DomainException("No copies available for loan");
    }
    this._availableQuantity--;
    this._updatedAt = new Date();
  }

  public increaseAvailableQuantity(): void {
    this._availableQuantity++;
    this._updatedAt = new Date();
  }

  // ------- validators
  private validateTitle(): void {
    if (!this._title || this._title.trim().length === 0) {
      throw new DomainException("Book title is required");
    }
  }

  private validateAuthor(): void {
    if (!this._author || this._author.trim().length === 0) {
      throw new DomainException("Book author is required");
    }
  }

  private validateQuantity(): void {
    if (this._availableQuantity < 0) {
      throw new DomainException("Available quantity cannot be negative");
    }
  }
  // -------
}
