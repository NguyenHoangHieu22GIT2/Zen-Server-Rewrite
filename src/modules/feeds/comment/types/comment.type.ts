import { userMinimalType } from 'src/common/types/objectTypes/user-minimal.type';
import { Comment } from '../entities/comment.entity';

export type TcommentsLookUpEndUser = (Omit<Comment, 'endUserId'> & {
  endUser: userMinimalType;
})[];
