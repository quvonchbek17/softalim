import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';

import { TeachersRepository } from 'src/entities/teachers.entity';
import { TeacherCreateDto } from './dto/create.dto';
import { FilesRepository } from 'src/entities/files.entity';
import { TeacherUpdateDto } from './dto/update.dto';
import { TeacherDeleteDto } from './dto/delete.dto';
import { FilesService } from '../files/files.service';
@ApiTags('api/v1/teachers')
@Injectable()
export class TeachersService {
  constructor(
    private readonly filesService: FilesService
  ) {}
  async getTeachers() {
    return {
      teachers: await TeachersRepository.find(),
    };
  }

  async getTeacherById(id: string) {
    return {
      teacher: await TeachersRepository.findOne({ where: { id } }),
    };
  }

  async CreateTeacher(
    userId: string,
    body: TeacherCreateDto,
    file: Express.Multer.File,
  ) {
    try {
      let teacher = await TeachersRepository.findOne({
        where: {
          fullname: body.fullname,
          desc: body.desc,
          specialty: body.specialty,
          experience: body.experience
        },
      });

      if(teacher) {
        throw new ConflictException("Bu ma'lumotlar avval qo'shilgan");
      }

      const newTeacher = await TeachersRepository.createQueryBuilder()
        .insert()
        .into(TeachersRepository)
        .values({
          fullname: body.fullname,
          desc: body.desc,
          specialty: body.specialty,
          experience: body.experience,
          imgUrl: file?.path || "https://picsum.photos/500/500"
        })
        .returning(['id'])
        .execute();

      const { id } = newTeacher.raw[0];

      if (id) {
        let size = '';
        Math.floor(file.size / (1024 * 1024)) > 0
          ? (size = (file.size / (1024 * 1024)).toFixed(2) + ' MB')
          : (size = (file.size / 1024).toFixed(2) + ' KB');
        await FilesRepository.createQueryBuilder()
          .insert()
          .into(FilesRepository)
          .values({
            name: file.originalname,
            uploadName: file.filename,
            type: file.mimetype,
            size: size,
            url: file.path
          })
          .returning(['id'])
          .execute();
      }

      if (id) {
        return {
          success: true,
          message: 'Yaratildi',
          teacher: await TeachersRepository.findOne({
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

  async updateTeacher(body: TeacherUpdateDto, file: Express.Multer.File, ) {
     try {
      let teacher = await TeachersRepository.findOne({
        where: { id: body.id },
      });
      if (!teacher) {
        return new NotFoundException("Bu idlik o'qituvchi mavjud emas");
      }

      if(file){
        let filename = teacher.imgUrl.split("/").at(-1)
        await FilesRepository.createQueryBuilder().delete().from(FilesRepository).where("uploadName= :filename", { filename: filename })
        .execute()
        this.filesService.deleteFiles("images", filename)
      }
      if(body){
        teacher.fullname = body?.fullname || teacher.fullname;
        teacher.desc = body?.desc || teacher.desc;
        teacher.experience = body?.experience || teacher.experience;
        teacher.imgUrl = file?.path || teacher.imgUrl;
        teacher.specialty = body?.specialty || teacher.specialty;
        teacher.updated_at = new Date();
        await TeachersRepository.save(teacher);
      }

      return teacher;

     } catch (error) {
       throw new BadRequestException(error.message);
     }

  }

  async deleteTeacher(body: TeacherDeleteDto) {
     try {
      let teacher = await TeachersRepository.findOne({
        where: { id: body.id },
      });
      if (!teacher) {
        return new NotFoundException("Bu idlik o'qituvchi mavjud emas");
      }

      let filename = teacher.imgUrl.split("/").at(-1)
      await FilesRepository.createQueryBuilder().delete().from(FilesRepository).where("uploadName= :filename", { filename: filename })
      .execute()
      this.filesService.deleteFiles("images", filename)

      await TeachersRepository.delete(body.id);

      return {
        message: "O'chirildi",
      };

     } catch (error) {
       throw new BadRequestException(error.message);
     }
  }
}
