import { Request, Body, Controller, Post, Req, HttpCode, HttpStatus, Patch, Get, Param, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags, ApiConsumes } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { CourseCreateDto } from './dto/create.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CourseUpdateDto } from './dto/update.dto';
import { CourseDeleteDto } from './dto/delete.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
@ApiTags("/api/v1/courses")
@Controller('courses')
export class CoursesController {
    constructor(
        private readonly coursesService: CoursesService
    ){}

    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        description: "Barcha kurslarni olish uchun"
    })
    @Get()
    async GetCourses() {
        return await this.coursesService.getCourses()
    }

    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        description: "Bitta kursni ma'lumotlarini  olish uchun"
    })
    @Get("/:courseId")
    async GetNewsById( @Param("courseId") courseId: string,) {
        return await this.coursesService.getCourseById(courseId)
    }


    @UseGuards(JwtAuthGuard)
    @Post("create")
    @HttpCode(HttpStatus.OK)
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor("image",{
        storage: diskStorage({
            destination: '../uploads/images',
            filename: (req, file, cb) => {
              const randomName = Array(32)
                .fill(null)
                .map(() => Math.round(Math.random() * 16).toString(16))
                .join('');
              return cb(null, `${randomName}.${file.originalname.split(".").at(-1)}`);
            },
          }),
    }))
    @ApiOperation({
        summary: "Kurs qo'shish"
    })
    @ApiHeader({
        name: 'Authorization',
        allowEmptyValue: false,
        required: true,
        schema: {
            example: "Bearer eyJhbGciOiJIUzI1NiJ9.YmUzNTFjMzItY2QzMS00ZWYzLWE0NDYtMWFlNmFlZTU1OGJi.kFawzPllutYXj022YGFc5BpIOlghD9sWXhj6GXL0SPE"
        }
    })
    async Create(@Req() req: Request, @Body() body: CourseCreateDto, @UploadedFile() image: Express.Multer.File) {
           image.path = "http://localhost:4545/api/v1/files/" + image.path.split("\\").at(-1)
        return await this.coursesService.CreateCourses(body, image)
    }
    @UseGuards(JwtAuthGuard)
    @Patch("update")
    @HttpCode(HttpStatus.OK)
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor("image",{
        storage: diskStorage({
            destination: '../uploads/images',
            filename: (req, file, cb) => {
              const randomName = Array(32)
                .fill(null)
                .map(() => Math.round(Math.random() * 16).toString(16))
                .join('');
              return cb(null, `${randomName}.${file.originalname.split(".").at(-1)}`);
            },
          }),
    }))
    @ApiOperation({
        summary: "Kursni o'zgartirish"
    })
    @ApiHeader({
        name: 'Authorization',
        allowEmptyValue: false,
        required: true,
        schema: {
            example: "Bearer eyJhbGciOiJIUzI1NiJ9.YmUzNTFjMzItY2QzMS00ZWYzLWE0NDYtMWFlNmFlZTU1OGJi.kFawzPllutYXj022YGFc5BpIOlghD9sWXhj6GXL0SPE"
        }
    })
    async Update(@Req() req: Request, @Body() body: CourseUpdateDto, @UploadedFile() image: Express.Multer.File) {
         if(image){
            image.path = "http://localhost:4545/api/v1/files/" + image.path.split("\\").at(-1)
         }
        return await this.coursesService.updateCourses(body, image)
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        description: "Kursni o'chirish"
    })
    @Delete("delete")
    async Delete(@Body() body: CourseDeleteDto) {
        return await this.coursesService.deleteCourse(body)
    }
}
