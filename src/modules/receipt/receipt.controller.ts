import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import {
  IReceiptService,
  IReceiptServiceString,
} from './service/receipt.service.interface';
import { ApiTags } from '@nestjs/swagger';
import { LoggedInGuard } from '../auth';
import { RequestUser } from 'src/common/types/utilTypes';
import { FindReceiptDto } from './dto/find-receipt.dto';
import { QueryLimitSkip } from 'src/cores/global-dtos';

@Controller('receipt')
@ApiTags('Receipt')
@UseGuards(LoggedInGuard)
export class ReceiptController {
  constructor(
    @Inject(IReceiptServiceString)
    private readonly receiptService: IReceiptService,
  ) {}

  @Post()
  create(@Req() req: RequestUser, @Body() createReceiptDto: CreateReceiptDto) {
    return this.receiptService.createReceipt(req.user._id, createReceiptDto);
  }

  @Get(':receiptId')
  findOne(@Param() findReceiptDto: FindReceiptDto, @Req() req: RequestUser) {
    return this.receiptService.findReceipt(
      req.user._id,
      findReceiptDto.receiptId,
    );
  }

  @Get()
  getReceipts(
    @Req() req: RequestUser,
    @Query() queryLimitSkip: QueryLimitSkip,
  ) {
    return this.receiptService.getReceipts(req.user._id, queryLimitSkip);
  }
}
