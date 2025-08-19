import { Module } from "@nestjs/common";
import { BooksController } from "./api/books.controller";
import { CreateBookUseCase } from "./application/use-cases/create-book.use-case";
import { GetBookUseCase } from "./application/use-cases/get-book.use-case";
import { ListBooksUseCase } from "./application/use-cases/list-books.use-case";
import { BookPrismaRepository } from "./infrastructure/repositories/book.prisma.repository";

const PRISMA_BOOK_REPOSITORY = "PRISMA_BOOK_REPOSITORY";

@Module({
  controllers: [BooksController],
  providers: [
    CreateBookUseCase,
    GetBookUseCase,
    ListBooksUseCase,
    {
      provide: PRISMA_BOOK_REPOSITORY,
      useClass: BookPrismaRepository,
    },
  ],
})
export class BooksModule {}
