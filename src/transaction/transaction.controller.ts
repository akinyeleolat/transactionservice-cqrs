import {
  Controller,
  Get,
  Body,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
  Param,
} from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { SaveTransactionCommand } from './commands/impl/save-transaction.command';
import { FindTransactionByIdParamDTO } from './dto/find-transaction-by-id.params.dto';
import { FindTransactionByIdResponseDTO } from './dto/find-transaction-by-id.response.dto';
import { ResponseDescription } from './helpers/response-description';
import { FindTransactionByIdQuery } from './queries/impl/find-transaction-by-id.query';
import { GetAllTransactionQuery } from './queries/impl/get-all-transaction.query';

@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  async getAll() {
    return await this.queryBus.execute(new GetAllTransactionQuery());
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 201, description: ResponseDescription.CREATED })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  async createTransaction(@Body() newTransaction: SaveTransactionCommand) {
    return await this.commandBus.execute(newTransaction);
  }

  @Get('/:id')
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
