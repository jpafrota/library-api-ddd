import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  ValidationPipe,
} from "@nestjs/common";
import { CreateBookUseCase } from "../application/use-cases/create-book.use-case";
import { GetBookUseCase } from "../application/use-cases/get-book.use-case";
import { ListBooksUseCase } from "../application/use-cases/list-books.use-case";
import { CreateBookDto } from "../application/dtos/create-book.dto";
import { BookResponseDto } from "../application/dtos/book-response.dto";

@Controller("books")
export class BooksController {
  constructor(
    private readonly createBookUseCase: CreateBookUseCase,
    private readonly getBookUseCase: GetBookUseCase,
    private readonly listBooksUseCase: ListBooksUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createBook(
    @Body(ValidationPipe) createBookDto: CreateBookDto,
  ): Promise<BookResponseDto> {
    return this.createBookUseCase.execute(createBookDto);
  }

  @Get(":id")
  async getBook(@Param("id") id: string): Promise<BookResponseDto> {
    return this.getBookUseCase.execute(id);
  }

  @Get()
  async listBooks(): Promise<BookResponseDto[]> {
    return this.listBooksUseCase.execute();
  }
}
