import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { userMinimalType } from 'src/common/types/objectTypes/user-minimal.type';
import { EndUser } from 'src/modules/users/enduser/entities/enduser.entity';
import {
  IAuthServiceStable,
  IAuthServiceStableString,
} from '../stable/auth.stable.interface';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(
    @Inject(IAuthServiceStableString)
    private readonly authServiceStable: IAuthServiceStable,
  ) {
    super();
  }
  serializeUser(
    user: EndUser,
    done: (err: Error, user: userMinimalType) => void,
  ) {
    done(null, { _id: user._id, username: user.username, avatar: user.avatar });
  }

  async deserializeUser(
    payload: userMinimalType,
    done: (err: Error, user: any) => void,
  ) {
    const user = await this.authServiceStable.findAccountById(payload._id);
    done(null, user);
  }
}
