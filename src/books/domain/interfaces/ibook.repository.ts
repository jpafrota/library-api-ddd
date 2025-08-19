import { Book } from "../entities/book.entity";

export interface IBookRepository {
  findById(id: string): Promise<Book | null>;
  findAll(): Promise<Book[]>;
  save(book: Book): Promise<void>;
  delete(id: string): Promise<void>;
}
