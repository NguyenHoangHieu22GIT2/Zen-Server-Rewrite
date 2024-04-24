import { Injectable } from '@nestjs/common';
import { EndUser } from '../../entities/';
import { EndUserId } from 'src/common/types/utilTypes/';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes/';
import { EndUserRepository } from '../../repository/enduser.repository';

@Injectable()
export class EnduserServiceStable {
  constructor(private readonly endUserRepository: EndUserRepository) {}

  public async findById(
    endUserId: EndUserId,
  ): Promise<DocumentMongodbType<EndUser>> {
    const user = await this.endUserRepository.findById(endUserId);
    return user;
  }
}
