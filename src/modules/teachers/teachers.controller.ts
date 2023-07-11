import { Request, Body, Controller, Post, Req, HttpCode, HttpStatus, Patch, Get, Param, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags, ApiConsumes } from '@nestjs/swagger';
import { TeachersService } from './teachers.service';
import { TeacherCreateDto } from './dto/create.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { TeacherUpdateDto } from './dto/update.dto';
import { TeacherDeleteDto } from './dto/delete.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
@ApiTags("/api/v1/teachers")
@Controller('teachers')
export class TeachersController {

    constructor(
        private readonly teachersService: TeachersService
    ){}

    @ApiOperation({
        description: "Barcha o'qituvchilarni olish uchun"
    })
    @Get()
    async GetTeachers() {
        return await this.teachersService.getTeachers()
    }

    @ApiOperation({
        description: "Bitta o'qituvchini ma'lumotlarini  olish uchun"
    })
    @Get("/:teacherId")
    async GetTeachersById( @Param("teacherId") teacherId: string,) {
        return await this.teachersService.getTeacherById(teacherId)
    }
    @UseGuards(JwtAuthGuard)
    @Post("create")
    @ApiHeader({
        name: 'Authorization',
        allowEmptyValue: false,
        required: true,
        schema: {
            example: "Bearer eyJhbGciOiJIUzI1NiJ9.YmUzNTFjMzItY2QzMS00ZWYzLWE0NDYtMWFlNmFlZTU1OGJi.kFawzPllutYXj022YGFc5BpIOlghD9sWXhj6GXL0SPE"
        }
    })
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
        summary: "O'qituvchi qo'shish"
    })
    async Create(@Req() req: Request, @Body() body: TeacherCreateDto, @UploadedFile() image: Express.Multer.File) {
           image.path = "https://softalim.mquvonchbek.uz/api/v1/files/" + image.path.split("\\").at(-1)
        return await this.teachersService.CreateTeacher(req.userId, body, image)
    }

    @UseGuards(JwtAuthGuard)
    @Patch("update")
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
        summary: "O'qituvchini o'zgartirish"
    })
    @ApiHeader({
        name: 'Authorization',
        allowEmptyValue: false,
        required: true,
        schema: {
            example: "Bearer eyJhbGciOiJIUzI1NiJ9.YmUzNTFjMzItY2QzMS00ZWYzLWE0NDYtMWFlNmFlZTU1OGJi.kFawzPllutYXj022YGFc5BpIOlghD9sWXhj6GXL0SPE"
        }
    })
    async Update(@Req() req: Request, @Body() body: TeacherUpdateDto, @UploadedFile() image: Express.Multer.File) {
         if(image){
            image.path = "https://softalim.mquvonchbek.uz/api/v1/files/" + image.path.split("\\").at(-1)
         }
        return await this.teachersService.updateTeacher(body, image)
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({
        description: "o'qituvchilarni o'chirish"
    })
    @Delete("delete")
    async Delete(@Body() body: TeacherDeleteDto) {
        return await this.teachersService.deleteTeacher(body)
    }
}
