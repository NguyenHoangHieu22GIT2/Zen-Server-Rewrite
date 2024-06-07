import { Module } from '@nestjs/common';
import { ReceiptController } from './receipt.controller';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';
import { ReceiptRepository } from './repository/receipt.repository';
import { ReceiptService } from './service/receipt.service';
import { IReceiptServiceString } from './service/receipt.service.interface';
import { MongooseModule } from '@nestjs/mongoose';
import { Receipt, ReceiptSchema } from './entities/receipt.entity';

@Module({
  controllers: [ReceiptController],
  providers: [
    { provide: IReceiptServiceString, useClass: ReceiptService },
    { provide: BaseRepositoryName, useClass: ReceiptRepository },
  ],
  imports: [
    MongooseModule.forFeature([{ name: Receipt.name, schema: ReceiptSchema }]),
  ],
})
export class ReceiptModule {}
