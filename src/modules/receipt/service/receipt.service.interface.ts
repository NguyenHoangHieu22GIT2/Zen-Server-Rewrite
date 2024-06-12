import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import { EndUserId, ReceiptId } from 'src/common/types/utilTypes';
import { Receipt } from '../entities/receipt.entity';
import { QueryLimitSkip } from 'src/cores/global-dtos';
import { CreateReceiptDto } from '../dto/create-receipt.dto';

export const IReceiptServiceString = 'IReceiptService';

export interface IReceiptService {
  createReceipt(
    endUserId: EndUserId,
    createReceiptDto: CreateReceiptDto,
  ): Promise<DocumentMongodbType<Receipt>>;

  getReceipts(
    endUserId: EndUserId,
    queryLimitSkip: QueryLimitSkip,
  ): Promise<DocumentMongodbType<Receipt>[]>;

  findReceipt(
    endUserId: EndUserId,
    receiptId: ReceiptId,
  ): Promise<DocumentMongodbType<Receipt>>;
}
