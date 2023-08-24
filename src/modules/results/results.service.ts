import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { JwtService } from '@nestjs/jwt';
    import { AuthService } from '../auth/auth.service';
  import { ApiTags } from '@nestjs/swagger';
  import { IeltsCreateDto, ResultCreateDto } from './dto/create.dto';
  import { IeltsUpdateDto,  ResultUpdateDto } from './dto/update.dto';
  import { ResultDeleteDto } from './dto/delete.dto';
import { ResultsRepository } from 'src/entities/results.entity';
  @ApiTags('api/v1/results')
  @Injectable()
  export class ResultsService {
    constructor() {}
    async getResults() {
      return {
        results: await ResultsRepository.find({
          order: {
            point: "DESC"
          },
          where: {isIelts: false}
        }),
      };

    }

    async getIelts() {
        return {
          ielts: await ResultsRepository.find({
            order: {
              point: "DESC"
            },
            where: {isIelts: true}
          }),
        };
    }
    async CreateResult(
      body: any,
      isIelts: boolean
    ) {
      try {
        let result = await ResultsRepository.findOne({
          where: {
            fullname: body.fullname,
            point: body.point,
            university: body.university,
            year: body.year,
            isIelts: isIelts
          }
        });

        if(result) {
          throw new ConflictException("Bu ma'lumotlar avval qo'shilgan");
        }
        const newResult = await ResultsRepository.createQueryBuilder()
          .insert()
          .into(ResultsRepository)
          .values({
            fullname: body.fullname,
            point: body.point,
            status: body.status,
            university: body.university,
            year: body.year,
            isIelts: isIelts
          })
          .returning(['id'])
          .execute();

        const { id } = newResult.raw[0];

        if (id) {
          return {
            success: true,
            message: 'Yaratildi',
            result: await ResultsRepository.findOne({
              where: { id: id }
            })
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

    async updateResult(body: any) {
       try {
        let result = await ResultsRepository.findOne({
          where: { id: body.id },
        });

        if (!result) {
          return new NotFoundException("Bu idlik natija mavjud emas");
        }

        if(body){
          result.fullname = body?.fullname || result.fullname;
          result.year = body?.year || result.year;
          result.status = body?.status || result.status;
          result.point = body?.point || result.point;
          result.university = body?.university || result.university;
          result.updated_at = new Date();
          await ResultsRepository.save(result);
        }

        return result;

       } catch (error) {
         throw new BadRequestException(error.message);
       }

    }

    async deleteResult(body: ResultDeleteDto) {
       try {
        let result = await ResultsRepository.findOne({
          where: { id: body.id },
        });
        if (!result) {
          return new NotFoundException("Bu idlik natija mavjud emas");
        }

        await ResultsRepository.delete(body.id);

        return {
          message: "O'chirildi",
        };

       } catch (error) {
         throw new BadRequestException(error.message);
       }
    }
  }
