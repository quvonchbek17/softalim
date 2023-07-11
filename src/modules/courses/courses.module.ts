import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { FilesService } from '../files/files.service';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService, FilesService]
})
export class CoursesModule {}
