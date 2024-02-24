import { Injectable } from '@nestjs/common';
import { GroupServiceStable } from '../stable/group.stable.service';
import { EndUserId } from 'src/common/types/utilTypes';
import { CreateGroupDto } from '../../dto';
import { TryCatchAllMethods } from 'src/cores/decorators/TryCatchedModified.decorator';

@Injectable()
@TryCatchAllMethods()
export class GroupServiceUnstable {
  public a: number = 2;
  constructor(private readonly groupServiceStable: GroupServiceStable) {}

  async createGroup(endUserId: EndUserId, createGroupDto: CreateGroupDto) {
    const group = await this.groupServiceStable.createGroup(
      endUserId,
      createGroupDto,
    );
    return group;
  }
}
