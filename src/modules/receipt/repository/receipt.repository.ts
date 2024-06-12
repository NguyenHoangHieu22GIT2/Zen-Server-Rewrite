import { GenericRepositoryMongodb } from 'src/cores/base-repository/Base-Mongodb.Repository';
import { Receipt } from '../entities/receipt.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReceiptRepository extends GenericRepositoryMongodb<Receipt> {
  constructor(
    @InjectModel(Receipt.name) readonly receiptModel: Model<Receipt>,
  ) {
    super(receiptModel);
  }
}
