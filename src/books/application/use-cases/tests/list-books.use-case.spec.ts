import { ListBooksUseCase } from "../list-books.use-case";
import { Book } from "../../../domain/entities/book.entity";
import type { IBookRepository } from "../../../domain/interfaces/ibook.repository";

describe("ListBooksUseCase", () => {
  let useCase: ListBooksUseCase;
  let mockRepository: jest.Mocked<IBookRepository>;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      delete: jest.fn(),
    } as jest.Mocked<IBookRepository>;
    useCase = new ListBooksUseCase(mockRepository);
  });

  it("should return empty array when no books exist", async () => {
    mockRepository.findAll.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });

  it("should return array of books when books exist", async () => {
    const books = [
      new Book("1", "Clean Code", "Robert Martin", 2008, 5),
      new Book("2", "Clean Architecture", "Robert Martin", 2017, 3),
    ];
    mockRepository.findAll.mockResolvedValue(books);

    const result = await useCase.execute();

    expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(2);
    expect(result[0].title).toBe("Clean Code");
    expect(result[1].title).toBe("Clean Architecture");
  });
});