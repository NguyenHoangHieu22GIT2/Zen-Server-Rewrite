import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import { EndUserId, ReceiptId } from 'src/common/types/utilTypes';
import { Receipt } from '../entities/receipt.entity';

export interface IReceiptService {
  createReceipt(endUserId: EndUserId): Promise<DocumentMongodbType<Receipt>>;

  getReceipts(endUserId: EndUserId): Promise<DocumentMongodbType<Receipt[]>>;

  findReceipt(
    endUserId: EndUserId,
    receiptId: ReceiptId,
  ): Promise<DocumentMongodbType<Receipt>>;
}
