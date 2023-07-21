import { Request, Body, Controller, Post, Req, HttpCode, HttpStatus, Patch, Get, Param, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags, ApiConsumes } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { NewsCreateDto } from './dto/create.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { NewsUpdateDto } from './dto/update.dto';
import { NewsDeleteDto } from './dto/delete.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import * as path from 'path';
@ApiTags("/api/v1/news")
@Controller('news')
export class NewsController {

    constructor(
        private readonly newsService: NewsService
    ){}

    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        description: "Barcha yangiliklarni olish uchun"
    })
    @Get()
    async GetNews() {
        return await this.newsService.getNews()
    }

    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        description: "Bitta yangilikni ma'lumotlarini  olish uchun"
    })
    @Get("/:newsId")
    async GetNewsById( @Param("newsId") newsId: string,) {
        return await this.newsService.getNewsById(newsId)
    }


    @UseGuards(JwtAuthGuard)
    @Post("create")
    @HttpCode(HttpStatus.OK)
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor("image",{
        storage: diskStorage({
            destination: path.join(process.cwd(), "..", "uploads"),
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
        summary: "Yangilik qo'shish"
    })
    @ApiHeader({
        name: 'Authorization',
        allowEmptyValue: false,
        required: true,
        schema: {
            example: "Bearer eyJhbGciOiJIUzI1NiJ9.YmUzNTFjMzItY2QzMS00ZWYzLWE0NDYtMWFlNmFlZTU1OGJi.kFawzPllutYXj022YGFc5BpIOlghD9sWXhj6GXL0SPE"
        }
    })
    async Create(@Req() req: Request, @Body() body: NewsCreateDto, @UploadedFile() image: Express.Multer.File) {
           image.path = "https://softalim.mquvonchbek.uz/api/v1/files/" + image.path.split("\\").at(-1)
        return await this.newsService.CreateNews(body, image)
    }

    @UseGuards(JwtAuthGuard)
    @Patch("update")
    @HttpCode(HttpStatus.OK)
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor("image",{
        storage: diskStorage({
            destination: path.join(process.cwd(), "..", "uploads"),
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
        summary: "Yangilikni o'zgartirish"
    })
    @ApiHeader({
        name: 'Authorization',
        allowEmptyValue: false,
        required: true,
        schema: {
            example: "Bearer eyJhbGciOiJIUzI1NiJ9.YmUzNTFjMzItY2QzMS00ZWYzLWE0NDYtMWFlNmFlZTU1OGJi.kFawzPllutYXj022YGFc5BpIOlghD9sWXhj6GXL0SPE"
        }
    })
    async Update(@Req() req: Request, @Body() body: NewsUpdateDto, @UploadedFile() image: Express.Multer.File) {
         if(image){
            image.path = "https://softalim.mquvonchbek.uz/api/v1/files/" + image.path.split("\\").at(-1)
         }
        return await this.newsService.updateNews(body, image)
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        description: "yangilikni o'chirish"
    })
    @Delete("delete")
    async Delete(@Body() body: NewsDeleteDto) {
        return await this.newsService.deleteNews(body)
    }
}
