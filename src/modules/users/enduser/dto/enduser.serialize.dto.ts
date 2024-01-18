import { Exclude, Expose } from 'class-transformer';
import { Types } from 'mongoose';

export class EndUserSerializeDto {
  @Exclude()
  password: string;

  @Exclude()
  modifyToken: string;

  @Exclude()
  activationToken: string;

  @Expose()
  _id: Types.ObjectId;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  avatar: string;

  @Expose()
  gender: string;

  @Expose()
  isOnline: boolean;

  @Expose()
  offlineTime: Date;

  @Expose()
  isBanned: boolean;

  @Expose()
  restrict: string[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
