import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { userMinimalType } from 'src/common/types/objectTypes/user-minimal.type';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';
import { EndUser } from 'src/modules/users/enduser/entities/enduser.entity';
import { AuthRepository } from '../repository/auth.repository';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(
    @Inject(BaseRepositoryName)
    private readonly authServiceStable: AuthRepository,
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
    const user = await this.authServiceStable.findById(payload._id);
    done(null, user);
  }
}
