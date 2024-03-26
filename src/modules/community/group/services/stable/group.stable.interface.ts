import { EndUserId, GroupId } from 'src/common/types/utilTypes';
import { CreateGroupDto, ModifyGroupDto } from '../../dto';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import { Group } from '../../entities';
import { PipelineStage } from 'mongoose';

export const IGroupServiceStableString = 'IGroupServiceStable';

export interface IGroupServiceStable {
  createGroup(
    endUserId: EndUserId,
    createGroupDto: CreateGroupDto,
  ): Promise<DocumentMongodbType<Group>>;

  findGroup(groupId: GroupId): Promise<DocumentMongodbType<Group> | undefined>;

  getGroups<T>(pipelineStages: PipelineStage[]): Promise<T[]>;

  deleteGroup(groupId: GroupId): unknown;

  saveGroup(groupId: GroupId, modifyGroupDto: ModifyGroupDto): Promise<unknown>;
}
