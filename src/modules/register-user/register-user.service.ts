import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { AuthService } from '../auth/auth.service';
  import { ApiTags } from '@nestjs/swagger';

  import { UserCreateDto } from './dto/create.dto';
  import { UserUpdateDto } from './dto/update.dto';
  import { UserDeleteDto } from './dto/delete.dto';
  import { UsersRepository } from 'src/entities/users.entity';
  @ApiTags('api/v1/users')
  @Injectable()
  export class RegisterUserService {
    constructor() {}
    async getUsers() {
      return {
        users: await UsersRepository.find({
            order: {
                created_at: "ASC"
            }
        }),
      };
    }

    async CreateUser(body: UserCreateDto) {
      try {

        const newUser = await UsersRepository.createQueryBuilder()
          .insert()
          .into(UsersRepository)
          .values({
            fullname: body.fullname,
            phone: body.phone
          })
          .returning(['id'])
          .execute();

        const { id } = newUser.raw[0];

        if (id) {
          return {
            success: true,
            message: 'Yaratildi',
            user: await UsersRepository.findOne({
              where: { id: id },
            }),
          };
        } else {
          return {
            success: false,
            message: 'Yaratilmadi',
          };
        }
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }

    async updateUser(body: UserUpdateDto) {
      try {
        let user = await UsersRepository.findOne({
          where: { id: body.id },
        });

        if (!user) {
          return new NotFoundException('Bu idlik user mavjud emas');
        }

        user.status = !user.status
        user.updated_at = new Date();
        await UsersRepository.save(user);


        return user;
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }

    async deleteUser(body: UserDeleteDto) {
      try {
        let user = await UsersRepository.findOne({
          where: { id: body.id },
        });
        if (!user) {
          return new NotFoundException('Bu idlik user mavjud emas');
        }
        await UsersRepository.delete(body.id);
        return {
          message: "O'chirildi",
        };
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }
  }
