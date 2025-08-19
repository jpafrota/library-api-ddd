import { Injectable, Inject } from "@nestjs/common";
import { uuidv7 } from "uuidv7";
import { Book } from "../../domain/entities/book.entity";
import type { IBookRepository } from "../../domain/interfaces/ibook.repository";
import { CreateBookDto } from "../dtos/create-book.dto";
import { BookResponseDto } from "../dtos/book-response.dto";

@Injectable()
export class CreateBookUseCase {
  constructor(
    @Inject("PRISMA_BOOK_REPOSITORY") private readonly bookRepository: IBookRepository,
  ) {}

  async execute(createBookDto: CreateBookDto): Promise<BookResponseDto> {
    const book = new Book(
      uuidv7(),
      createBookDto.title,
      createBookDto.author,
      createBookDto.publicationYear,
      createBookDto.availableQuantity,
    );

    await this.bookRepository.save(book);

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
