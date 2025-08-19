import { CreateBookUseCase } from "../create-book.use-case";
import { CreateBookDto } from "../../dtos/create-book.dto";
import type { IBookRepository } from "../../../domain/interfaces/ibook.repository";

describe("CreateBookUseCase", () => {
  let useCase: CreateBookUseCase;
  let mockRepository: jest.Mocked<IBookRepository>;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      delete: jest.fn(),
    } as jest.Mocked<IBookRepository>;
    useCase = new CreateBookUseCase(mockRepository);
  });

  it("should create a book successfully", async () => {
    const dto: CreateBookDto = {
      title: "Clean Code",
      author: "Robert Martin",
      publicationYear: 2008,
      availableQuantity: 5,
    };

    const result = await useCase.execute(dto);

    expect(mockRepository.save).toHaveBeenCalledTimes(1);
    expect(result.title).toBe(dto.title);
    expect(result.author).toBe(dto.author);
    expect(result.publicationYear).toBe(dto.publicationYear);
    expect(result.availableQuantity).toBe(dto.availableQuantity);
  });

  it("should throw error for invalid title", async () => {
    const dto: CreateBookDto = {
      title: "",
      author: "Robert Martin",
      publicationYear: 2008,
      availableQuantity: 5,
    };

    await expect(useCase.execute(dto)).rejects.toThrow("Book title is required");
    expect(mockRepository.save).toHaveBeenCalledTimes(0);
  });

  it("should throw error for invalid author", async () => {
    const dto: CreateBookDto = {
      title: "Clean Code",
      author: "",
      publicationYear: 2008,
      availableQuantity: 5,
    };

    await expect(useCase.execute(dto)).rejects.toThrow("Book author is required");
    expect(mockRepository.save).toHaveBeenCalledTimes(0);
  });
});