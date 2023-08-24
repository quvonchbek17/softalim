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

  import { TeachersRepository } from 'src/entities/teachers.entity';
  import { NewsCreateDto } from './dto/create.dto';
  import { FilesRepository } from 'src/entities/files.entity';
  import { NewsUpdateDto } from './dto/update.dto';
  import { NewsDeleteDto } from './dto/delete.dto';
import { NewsRepository } from 'src/entities/news.entity';
import { FilesService } from '../files/files.service';
  @ApiTags('api/v1/news')
  @Injectable()
  export class NewsService {
    constructor(
        private readonly filesService: FilesService
    ) {}
    async getNews() {
        await NewsRepository
        .createQueryBuilder()
        .update(NewsRepository)
        .set({ view: () => "view + 1" })
        .execute();
      return {
        news: await NewsRepository.find(),
      };
    }

    async getNewsById(id: string) {
        let news = await NewsRepository.findOne({
            where: {
             id
            }
          });
        news.view = news.view + 1
        await NewsRepository.save(news);
      return {
        news: await NewsRepository.findOne({ where: { id } }),
      };
    }

    async CreateNews(
      body: NewsCreateDto,
      file: Express.Multer.File,
    ) {
      try {
        let news = await NewsRepository.findOne({
          where: {
            title: body.title,
            desc: body.desc,
            view: 0
          }
        });

        if(news) {
          throw new ConflictException("Bu ma'lumotlar avval qo'shilgan");
        }

        const newNews = await NewsRepository.createQueryBuilder()
          .insert()
          .into(NewsRepository)
          .values({
            title: body.title,
            desc: body.desc,
            imgUrl: file.path || "https://picsum.photos/500/500"
          })
          .returning(['id'])
          .execute();

        const { id } = newNews.raw[0];

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
            news: await NewsRepository.findOne({
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

    async updateNews(body: NewsUpdateDto, file: Express.Multer.File, ) {
       try {
        let news = await NewsRepository.findOne({
          where: { id: body.id },
        });

        if (!news) {
          return new NotFoundException("Bu idlik yangilik mavjud emas");
        }

        if(file){
            let filename = news.imgUrl.split("/").at(-1)
            await FilesRepository.createQueryBuilder().delete().from(FilesRepository).where("uploadName= :filename", { filename: filename })
            .execute()
            this.filesService.deleteFiles("images", filename)
        }
        if(body){
          news.title = body.title || news.title;
          news.desc = body.desc || news.desc;
          news.imgUrl = file?.path || news.imgUrl;
          news.updated_at = new Date();
          await NewsRepository.save(news);
        }

        return news;

       } catch (error) {
         throw new BadRequestException(error.message);
       }

    }

    async deleteNews(body: NewsDeleteDto) {
       try {
        let news = await NewsRepository.findOne({
          where: { id: body.id },
        });
        if (!news) {
          return new NotFoundException("Bu idlik yangilik mavjud emas");
        }
        let filename = news.imgUrl.split("/").at(-1)
        await FilesRepository.createQueryBuilder().delete().from(FilesRepository).where("uploadName= :filename", { filename: filename })
        .execute()
        this.filesService.deleteFiles("images", filename)

        await NewsRepository.delete(body.id);

        return {
          message: "O'chirildi",
        };

       } catch (error) {
         throw new BadRequestException(error.message);
       }
    }
  }
