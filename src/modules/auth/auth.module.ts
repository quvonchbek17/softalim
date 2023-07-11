import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdminsRepository } from 'src/entities/admins.entity'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([ AdminsRepository ]),
    JwtModule.register({
        secret: "1q2w3e4r5t"
    })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy ]
})
export class AuthModule {}