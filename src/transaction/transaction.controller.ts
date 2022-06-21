import {
  Controller,
  Get,
  Body,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
  Param,
  Query,
} from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SaveTransactionCommand } from './commands/impl/save-transaction.command';
import { CreateTransactionBodyDto } from './dto/create-transaction-body.dto';
import { CreateTransactionResponseDTO } from './dto/create-transaction.response.dto';
import { FindTransactionByIdParamDTO } from './dto/find-transaction-by-id.params.dto';
import { FindTransactionByIdResponseDTO } from './dto/find-transaction-by-id.response.dto';
import { GetTransactionParamDTO } from './dto/get-all-transaction.params.dto';
import { GetTransactionsResponseDTO } from './dto/get-all-transaction.response.dto';
import { ResponseDescription } from './helpers/response-description';
import { FindTransactionByIdQuery } from './queries/impl/find-transaction-by-id.query';
import { GetAllTransactionQuery } from './queries/impl/get-all-transaction.query';

@Controller('transactions')
@ApiTags('Transactions')
export class TransactionController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({
    status: 200,
    description: ResponseDescription.OK,
    type: [GetTransactionsResponseDTO],
  })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  async getAll(
    @Query() queryDTO: GetTransactionParamDTO,
  ): Promise<GetTransactionsResponseDTO> {
    const query = new GetAllTransactionQuery(queryDTO.page, queryDTO.pageSize);
    return await this.queryBus.execute(query);
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 201, description: ResponseDescription.CREATED })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  async createTransaction(
    @Body() body: CreateTransactionBodyDto,
  ): Promise<CreateTransactionResponseDTO> {
    const newTransaction = new SaveTransactionCommand(
      body.customerId,
      body.transactionCurrency,
      body.processedCurrency,
      body.transactionAmount,
    );
    return await this.commandBus.execute(newTransaction);
  }

  @Get('/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({
    status: 200,
    description: ResponseDescription.OK,
    type: FindTransactionByIdResponseDTO,
  })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiNotFoundResponse({ description: ResponseDescription.NOT_FOUND })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  async findTransactionById(
    @Param() param: FindTransactionByIdParamDTO,
  ): Promise<FindTransactionByIdResponseDTO> {
    const query = new FindTransactionByIdQuery(param.id);
    return this.queryBus.execute(query);
  }
}
