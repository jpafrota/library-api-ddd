export class BookResponseDto {
  id: string;
  title: string;
  author: string;
  publicationYear: number;
  availableQuantity: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    title: string,
    author: string,
    publicationYear: number,
    availableQuantity: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.publicationYear = publicationYear;
    this.availableQuantity = availableQuantity;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
