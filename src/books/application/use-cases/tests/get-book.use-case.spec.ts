import { GetBookUseCase } from "../get-book.use-case";
import { Book } from "../../../domain/entities/book.entity";
import { NotFoundException } from "@nestjs/common";
import type { IBookRepository } from "../../../domain/interfaces/ibook.repository";

describe("GetBookUseCase", () => {
  let useCase: GetBookUseCase;
  let mockRepository: jest.Mocked<IBookRepository>;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      delete: jest.fn(),
    } as jest.Mocked<IBookRepository>;
    useCase = new GetBookUseCase(mockRepository);
  });

  it("should return book when found", async () => {
    const book = new Book("123", "Clean Code", "Robert Martin", 2008, 5);
    mockRepository.findById.mockResolvedValue(book);

    const result = await useCase.execute("123");

    expect(mockRepository.findById).toHaveBeenCalledWith("123");
    expect(result.id).toBe("123");
    expect(result.title).toBe("Clean Code");
    expect(result.author).toBe("Robert Martin");
  });

  it("should throw NotFoundException when book not found", async () => {
    mockRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute("123")).rejects.toThrow(NotFoundException);
    expect(mockRepository.findById).toHaveBeenCalledWith("123");
  });
});