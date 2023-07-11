import { Module } from '@nestjs/common';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';
import { FilesService } from '../files/files.service';

@Module({
  controllers: [TeachersController],
  providers: [TeachersService, FilesService]
})
export class TeachersModule {}
