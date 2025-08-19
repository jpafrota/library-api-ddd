export interface IBookPersistenceData {
  id: string;
  title: string;
  author: string;
  publicationYear: number;
  availableQuantity: number;
  createdAt: Date;
  updatedAt: Date;
}