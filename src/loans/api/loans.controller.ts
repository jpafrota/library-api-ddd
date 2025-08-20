import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  HttpCode,
  HttpStatus,
  ValidationPipe,
} from "@nestjs/common";
import { CreateLoanUseCase } from "../application/use-cases/create-loan.use-case";
import { GetLoanUseCase } from "../application/use-cases/get-loan.use-case";
import { ListLoansUseCase } from "../application/use-cases/list-loans.use-case";
import { ReturnLoanUseCase } from "../application/use-cases/return-loan.use-case";
import { CreateLoanDto } from "../application/dtos/create-loan.dto";
import { LoanResponseDto } from "../application/dtos/loan-response.dto";

@Controller("loans")
export class LoansController {
  constructor(
    private readonly createLoanUseCase: CreateLoanUseCase,
    private readonly getLoanUseCase: GetLoanUseCase,
    private readonly listLoansUseCase: ListLoansUseCase,
    private readonly returnLoanUseCase: ReturnLoanUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createLoan(
    @Body(ValidationPipe) createLoanDto: CreateLoanDto,
  ): Promise<LoanResponseDto> {
    return this.createLoanUseCase.execute(createLoanDto);
  }

  @Get(":id")
  async getLoan(@Param("id") id: string): Promise<LoanResponseDto> {
    return this.getLoanUseCase.execute(id);
  }

  @Get()
  async listLoans(): Promise<LoanResponseDto[]> {
    return this.listLoansUseCase.execute();
  }

  @Patch(":id/return")
  async returnLoan(@Param("id") id: string): Promise<LoanResponseDto> {
    return this.returnLoanUseCase.execute(id);
  }
}