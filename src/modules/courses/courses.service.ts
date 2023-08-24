import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { ApiTags } from '@nestjs/swagger';

import { CourseCreateDto } from './dto/create.dto';
import { FilesRepository } from 'src/entities/files.entity';
import { CourseUpdateDto } from './dto/update.dto';
import { CourseDeleteDto } from './dto/delete.dto';
import { FilesService } from '../files/files.service';
import { CoursesRepository } from 'src/entities/courses.entity';
@ApiTags('api/v1/courses')
@Injectable()
export class CoursesService {
  constructor(private readonly filesService: FilesService) {}
  async getCourses() {
    await CoursesRepository.createQueryBuilder()
      .update(CoursesRepository)
      .set({ view: () => 'view + 1' })
      .execute();
    return {
      courses: await CoursesRepository.find(),
    };
  }

  async getCourseById(id: string) {
    let courses = await CoursesRepository.findOne({
      where: {
        id,
      },
    });
    courses.view = courses.view + 1;
    await CoursesRepository.save(courses);
    return {
      course: await CoursesRepository.findOne({ where: { id } }),
    };
  }

  async CreateCourses(body: CourseCreateDto, file: Express.Multer.File) {
    try {
      let course = await CoursesRepository.findOne({
        where: {
          name: body.name,
          desc: body.desc,
          price: body.price,
          view: 0
        },
      });

      let courseName = await CoursesRepository.findOne({
        where: {
          name: body.name
        },
      });

      if (course) {
        throw new ConflictException("Bu ma'lumotlar avval qo'shilgan");
      }

      if (courseName) {
        throw new ConflictException("Bu nomdagi kurs avval qo'shilgan");
      }

      const newCourse = await CoursesRepository.createQueryBuilder()
        .insert()
        .into(CoursesRepository)
        .values({
          name: body.name,
          desc: body.desc,
          price: body.price,
          view: 0,
          imgUrl: file.path || 'https://picsum.photos/500/500',
        })
        .returning(['id'])
        .execute();

      const { id } = newCourse.raw[0];

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
            url: file.path,
          })
          .returning(['id'])
          .execute();
      }

      if (id) {
        return {
          success: true,
          message: 'Yaratildi',
          course: await CoursesRepository.findOne({
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

  async updateCourses(body: CourseUpdateDto, file: Express.Multer.File) {
    try {
      let course = await CoursesRepository.findOne({
        where: { id: body.id },
      });

      if (!course) {
        return new NotFoundException('Bu idlik kurs mavjud emas');
      }

      if (file) {
        let filename = course.imgUrl.split('/').at(-1);
        await FilesRepository.createQueryBuilder()
          .delete()
          .from(FilesRepository)
          .where('uploadName= :filename', { filename: filename })
          .execute();
        this.filesService.deleteFiles('images', filename);
      }
      if (body) {
        course.name = body?.name || course.name;
        course.desc = body?.desc || course.desc;
        course.price = body?.price || course.price;
        course.imgUrl = file?.path || course.imgUrl;
        course.updated_at = new Date();
        await CoursesRepository.save(course);
      }

      return course;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteCourse(body: CourseDeleteDto) {
    try {
      let course = await CoursesRepository.findOne({
        where: { id: body.id },
      });
      if (!course) {
        return new NotFoundException('Bu idlik kurs mavjud emas');
      }
      let filename = course.imgUrl.split('/').at(-1);
      await FilesRepository.createQueryBuilder()
        .delete()
        .from(FilesRepository)
        .where('uploadName= :filename', { filename: filename })
        .execute();
      this.filesService.deleteFiles('images', filename);

      await CoursesRepository.delete(body.id);

      return {
        message: "O'chirildi",
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
