import { Module } from '@nestjs/common';
import { ReceiptController } from './receipt.controller';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';
import { ReceiptRepository } from './repository/receipt.repository';
import { ReceiptService } from './service/receipt.service';
import { IReceiptServiceString } from './service/receipt.service.interface';

@Module({
  controllers: [ReceiptController],
  providers: [
    { provide: IReceiptServiceString, useClass: ReceiptService },
    { provide: BaseRepositoryName, useClass: ReceiptRepository },
  ],
})
export class ReceiptModule {}
