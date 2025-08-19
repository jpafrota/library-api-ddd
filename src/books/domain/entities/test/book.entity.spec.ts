import { Book } from "../book.entity";

describe("Book Entity", () => {
  describe("constructor validation", () => {
    it("should create a valid book", () => {
      const book = new Book("id", "Clean Code", "Robert Martin", 2008, 5);

      expect(book.title).toBe("Clean Code");
      expect(book.author).toBe("Robert Martin");
      expect(book.publicationYear).toBe(2008);
      expect(book.availableQuantity).toBe(5);
    });

    it("should throw error for empty title", () => {
      expect(() => {
        new Book("id", "", "Author", 2008, 5);
      }).toThrow("Book title is required");
    });

    it("should throw error for empty author", () => {
      expect(() => {
        new Book("id", "Title", "", 2008, 5);
      }).toThrow("Book author is required");
    });

    it("should throw error for negative quantity", () => {
      expect(() => {
        new Book("id", "Title", "Author", 2008, -1);
      }).toThrow("Available quantity cannot be negative");
    });
  });

  describe("business rules", () => {
    let book: Book;

    beforeEach(() => {
      book = new Book("id", "Clean Code", "Robert Martin", 2008, 2);
    });

    it("should allow loan when quantity > 0", () => {
      expect(book.canBeLoanedTo()).toBe(true);
    });

    it("should not allow loan when quantity = 0", () => {
      const emptyBook = new Book("id", "Title", "Author", 2008, 0);
      expect(emptyBook.canBeLoanedTo()).toBe(false);
    });

    it("should decrease quantity on loan", () => {
      book.decreaseAvailableQuantity();
      expect(book.availableQuantity).toBe(1);
    });

    it("should increase quantity on return", () => {
      book.increaseAvailableQuantity();
      expect(book.availableQuantity).toBe(3);
    });

    it("should throw error when loaning unavailable book", () => {
      const emptyBook = new Book("id", "Title", "Author", 2008, 0);
      expect(() => {
        emptyBook.decreaseAvailableQuantity();
      }).toThrow("No copies available for loan");
    });
  });
});