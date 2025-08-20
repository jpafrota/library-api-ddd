import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { BooksModule } from "./books/books.module";
import { LoansModule } from "./loans/loans.module";
import { PrismaModule } from "./shared/database/prisma.module";

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, BooksModule, LoansModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
