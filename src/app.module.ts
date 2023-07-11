import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';
import { typeOrmAsyncConfig } from './ormconfig/typeorm.config';
import { TeachersModule } from './modules/teachers/teachers.module';
import { FilesModule } from './modules/files/files.module';
import { AuthModule } from './modules/auth/auth.module';
import { NewsModule } from './modules/news/news.module';
import { CoursesModule } from './modules/courses/courses.module';
import { ResultsModule } from './modules/results/results.module';
import { RegisterUserModule } from './modules/register-user/register-user.module';

@Module({
  imports: [
    ConfigModule.forRoot(config),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    TeachersModule,
    FilesModule,
    AuthModule,
    NewsModule,
    CoursesModule,
    ResultsModule,
    RegisterUserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
