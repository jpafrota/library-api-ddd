import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import type { IBookRepository } from "../../domain/interfaces/ibook.repository";
import { BookResponseDto } from "../dtos/book-response.dto";

@Injectable()
export class GetBookUseCase {
  constructor(
    @Inject("PRISMA_BOOK_REPOSITORY")
    private readonly bookRepository: IBookRepository,
  ) {}

  async execute(id: string): Promise<BookResponseDto> {
    const book = await this.bookRepository.findById(id);

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return new BookResponseDto(
      book.id,
      book.title,
      book.author,
      book.publicationYear,
      book.availableQuantity,
      book.createdAt,
      book.updatedAt,
    );
  }
}
