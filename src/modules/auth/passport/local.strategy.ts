import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserRedis } from 'src/cores/redis/user.redis';
import { IAuthService, IAuthServiceString } from '../service/auth.interface';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(IAuthServiceString)
    private readonly authService: IAuthService,
  ) {
    super({
      usernameField: 'email',
      session: true,
    });
  }

  /**
   * validate function has to be named validate.
   * So I can not change it to fit with the responsibility it has.
   * Sad but nothing we can do.
   * */
  async validate(email: string, password: string) {
    const user = await this.authService.loginAccount({ email, password });
    //by default, session will be stored in "sess:sessionID" KEY
    //store into current_access_user for afterward usage
    await Promise.all([
      UserRedis.usersRecentlyLoginPFADD(user.email),
      UserRedis.userConvertToRedisTypeThenHSET(user.email, user),
    ]);
    return user;
  }
}
