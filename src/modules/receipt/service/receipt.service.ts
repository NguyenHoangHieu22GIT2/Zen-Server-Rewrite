import { Inject, Injectable } from '@nestjs/common';
import { IReceiptService } from './receipt.service.interface';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import { EndUserId, ReceiptId } from 'src/common/types/utilTypes';
import { Receipt } from '../entities/receipt.entity';
import { ReceiptRepository } from '../repository/receipt.repository';
import { CreateReceiptDto } from '../dto/create-receipt.dto';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { noObj } from 'src/common/utils';
import { TryCatchDecorator } from 'src/cores/decorators';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';

@Injectable()
@TryCatchDecorator()
export class ReceiptService implements IReceiptService {
  constructor(
    @Inject(BaseRepositoryName)
    private readonly receiptRepository: ReceiptRepository,
  ) {}

  public async createReceipt(
    endUserId: EndUserId,
    createReceiptDto: CreateReceiptDto,
  ): Promise<DocumentMongodbType<Receipt>> {
    const receipt = await this.receiptRepository.create({
      subscriptionId: createReceiptDto.subscriptionId,
      endUserId: endUserId,
    });
    return receipt;
  }

  public async findReceipt(
    endUserId: EndUserId,
    receiptId: ReceiptId,
  ): Promise<DocumentMongodbType<Receipt>> {
    const receipt = await this.receiptRepository.findOne({
      endUserId,
      _id: receiptId,
    });
    return receipt;
  }

  public async getReceipts(
    endUserId: EndUserId,
    queryLimitSkip: QueryLimitSkip,
  ): Promise<DocumentMongodbType<Receipt>[]> {
    const receipts = await this.receiptRepository.find({ endUserId }, noObj, {
      ...queryLimitSkip,
    });
    return receipts;
  }
}
