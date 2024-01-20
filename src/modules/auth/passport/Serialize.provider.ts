import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { AuthServiceStable } from '../stable/auth.stable.service';
import { userMinimalType } from 'src/common/types/objectTypes/user-minimal.type';
import { EndUser } from 'src/modules/users/enduser/entities/enduser.entity';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private readonly authServiceStable: AuthServiceStable) {
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
