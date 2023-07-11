import { Module } from '@nestjs/common';
import { RegisterUserController } from './register-user.controller';
import { RegisterUserService } from './register-user.service';

@Module({
  controllers: [RegisterUserController],
  providers: [RegisterUserService]
})
export class RegisterUserModule {}
