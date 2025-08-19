import { Injectable, Inject } from "@nestjs/common";
import type { IBookRepository } from "../../domain/interfaces/ibook.repository";
import { BookResponseDto } from "../dtos/book-response.dto";

@Injectable()
export class ListBooksUseCase {
  constructor(
    @Inject("PRISMA_BOOK_REPOSITORY") private readonly bookRepository: IBookRepository,
  ) {}

  async execute(): Promise<BookResponseDto[]> {
    const books = await this.bookRepository.findAll();

    return books.map(
      (book) =>
        new BookResponseDto(
          book.id,
          book.title,
          book.author,
          book.publicationYear,
          book.availableQuantity,
          book.createdAt,
          book.updatedAt,
        ),
    );
  }
}
