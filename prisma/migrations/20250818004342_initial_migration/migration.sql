-- CreateEnum
CREATE TYPE "public"."LoanStatus" AS ENUM ('ACTIVE', 'RETURNED');

-- CreateTable
CREATE TABLE "public"."books" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "publication_year" INTEGER NOT NULL,
    "available_quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."loans" (
    "id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,
    "loan_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "return_date" TIMESTAMP(3),
    "status" "public"."LoanStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "loans_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."loans" ADD CONSTRAINT "loans_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
