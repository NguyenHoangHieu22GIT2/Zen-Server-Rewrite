import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthServiceUnstable } from '../unstable/auth.unstable.service';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthServiceUnstable) {
    super({
      usernameField: 'email',
      session: true,
    });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.loginAccount({ email, password });
    return user;
  }
}
