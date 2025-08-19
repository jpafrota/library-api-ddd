import { Injectable } from "@nestjs/common";
import { Book as PrismaBook } from "@prisma/client";
import { PrismaService } from "../../../shared/database/prisma.service";
import { IBookRepository } from "../../domain/interfaces/ibook.repository";
import { Book } from "../../domain/entities/book.entity";
import { BookMapper } from "../mappers/book.mapper";
import { IBookPersistenceData } from "../../domain/interfaces/ibook-persistence.interface";

@Injectable()
export class BookPrismaRepository implements IBookRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Book | null> {
    const prismaBook: PrismaBook | null = await this.prisma.book.findUnique({
      where: { id },
    });

    if (!prismaBook) {
      return null;
    }

    const persistenceData: IBookPersistenceData = this.toPersistenceData(prismaBook);
    return BookMapper.toDomain(persistenceData);
  }

  async findAll(): Promise<Book[]> {
    const prismaBooks: PrismaBook[] = await this.prisma.book.findMany({
      orderBy: { createdAt: "desc" },
    });

    return prismaBooks.map((prismaBook: PrismaBook) => {
      const persistenceData: IBookPersistenceData = this.toPersistenceData(prismaBook);
      return BookMapper.toDomain(persistenceData);
    });
  }

  async save(book: Book): Promise<void> {
    const persistenceData = BookMapper.toPersistence(book);

    await this.prisma.book.upsert({
      where: { id: book.id },
      create: persistenceData,
      update: {
        title: persistenceData.title,
        author: persistenceData.author,
        publicationYear: persistenceData.publicationYear,
        availableQuantity: persistenceData.availableQuantity,
        updatedAt: persistenceData.updatedAt,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.book.delete({
      where: { id },
    });
  }

  private toPersistenceData(prismaBook: PrismaBook): IBookPersistenceData {
    return {
      id: prismaBook.id,
      title: prismaBook.title,
      author: prismaBook.author,
      publicationYear: prismaBook.publicationYear,
      availableQuantity: prismaBook.availableQuantity,
      createdAt: prismaBook.createdAt,
      updatedAt: prismaBook.updatedAt,
    };
  }
}
