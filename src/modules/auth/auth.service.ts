import { Injectable, ConflictException, NotFoundException, InternalServerErrorException, UnauthorizedException, Body, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminsRepository } from 'src/entities/admins.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from 'src/interface/sign.interface';
import { Sign } from './dto/dto';
import { compareSync, hashSync } from 'bcrypt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AdminsRepository)
        private readonly admins: Repository<AdminsRepository>,
        private readonly JwtService: JwtService
    ) {}

    async Sign(@Body() body: Sign): Promise<AuthResponse | BadRequestException> {

        const admin = await this.admins.findOne({
            where: {
                adminname: body.adminname,
                password: body.password
            }
        })

        if(admin) {
            const token = this.sign(admin.id)
            return {
                success: true,
                message: "Admin mavjud",
                token: token
            }

        } else {
            throw new NotFoundException({message: "Admin topilmadi", status: 404})
        }
    }


    sign(payload: string) {
        return this.JwtService.sign(payload, {
            secret: process.env.SECRET_KEY
        })
    }

    verify(payload: string) {

        try {
           console.log(payload);
        return this.JwtService.verify(payload, {
            secret: process.env.SECRET_KEY
        })
       } catch(err) {
          throw new BadRequestException({message: "Tokenda muammo bor", status: 400})
       }
    }

    async validateUser(id: string): Promise<any> {
        console.log(id);

        const existingUser = await this.admins.findOne({
            where: {
                id
            }
        })

        if(!existingUser) {
            throw new NotFoundException({message: "Admin topilmadi", status: 404})
        }

    }
}
