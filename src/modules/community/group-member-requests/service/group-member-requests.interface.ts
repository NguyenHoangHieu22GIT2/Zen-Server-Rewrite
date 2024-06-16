import { EndUserId, GroupId } from 'src/common/types/utilTypes';
import { GroupMemberRequest } from '../entities/group-member-request.entity';
import { DocumentMongodbType } from 'src/common/types/mongodbTypes';
import { Group } from '../../group/entities';

export const IGroupMemberRequestsString = 'IGroupMemberRequests';

export interface IGroupMemberRequests<T = GroupMemberRequest> {
  createRequest(
    endUserId: EndUserId,
    groupId: GroupId,
  ): Promise<DocumentMongodbType<T>>;

  declineRequest(
    hostId: EndUserId,
    endUserId: EndUserId,
    group: Group,
  ): Promise<DocumentMongodbType<T>>;

  acceptRequest(
    hostId: EndUserId,
    endUserId: EndUserId,
    group: Group,
  ): Promise<DocumentMongodbType<T>>;

  getRequests(
    hostId: EndUserId,
    group: Group,
  ): Promise<DocumentMongodbType<T>[]>;
}
