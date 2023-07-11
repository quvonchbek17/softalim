import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { FilesService } from '../files/files.service';

@Module({
  controllers: [NewsController],
  providers: [NewsService, FilesService]
})
export class NewsModule {}
