import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EndUser,EndUserSchema } from 'src/modules/users/enduser/entities/enduser.entity';


@Injectable()
export class AuthServiceStable {
  constructor(
    @InjectModel(EndUser.name) private readonly EndUserModel: Model<EndUser>,
  ) {}

  async checkAccountIfAlreadyExist(email: string) {
    const user = await this.EndUserModel.findOne({ email });
    return user ? user : null;
  }
}
