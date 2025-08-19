import { IsString, IsNumber, Min, IsNotEmpty } from "class-validator";

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsNumber()
  @Min(0)
  publicationYear: number;

  @IsNumber()
  @Min(1)
  availableQuantity: number;
}
