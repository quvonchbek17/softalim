import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { log } from 'console';

declare global {
  interface Request {
    userId: string
  }
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly AuthService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "1q2w3e4r5t",
      pass: true,
      passReqToCallback: true
    });
  }

  async validate(req: Request, payload: string) {
    console.log(payload);

    await this.AuthService.validateUser(payload)
    req.userId = payload
    return { payload };
  }
}