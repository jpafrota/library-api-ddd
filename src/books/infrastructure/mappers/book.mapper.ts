import { Book } from "../../domain/entities/book.entity";
import { IBookPersistenceData } from "../../domain/interfaces/ibook-persistence.interface";

export class BookMapper {
  static toDomain(persistenceData: IBookPersistenceData): Book {
    return new Book(
      persistenceData.id,
      persistenceData.title,
      persistenceData.author,
      persistenceData.publicationYear,
      persistenceData.availableQuantity,
      persistenceData.createdAt,
      persistenceData.updatedAt,
    );
  }

  static toPersistence(book: Book): IBookPersistenceData {
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      publicationYear: book.publicationYear,
      availableQuantity: book.availableQuantity,
      createdAt: book.createdAt,
      updatedAt: book.updatedAt,
    };
  }
}
