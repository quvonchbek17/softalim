import { Request, Body, Controller, Post, Req, HttpCode, HttpStatus, Patch, Get, Param, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags, ApiConsumes } from '@nestjs/swagger';
import { ResultsService } from './results.service';
import { IeltsCreateDto, ResultCreateDto } from './dto/create.dto';
import { IeltsUpdateDto, ResultUpdateDto } from './dto/update.dto';
import { ResultDeleteDto } from './dto/delete.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
@ApiTags("/api/v1/results")
@Controller('results')
export class ResultsController {

    constructor(
        private readonly resultsService: ResultsService
    ){}

    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        description: "Barcha natijalarni olish uchun"
    })
    @Get()
    async GetResults() {
        return await this.resultsService.getResults()
    }

    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        description: "Barcha Ielts natijalarni olish uchun"
    })

    @Get("/ielts")
    async GetIelts() {
        return await this.resultsService.getIelts()
    }

    @UseGuards(JwtAuthGuard)
    @Post("create")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: "Natija qo'shish"
    })
    @ApiHeader({
        name: 'Authorization',
        allowEmptyValue: false,
        required: true,
        schema: {
            example: "Bearer eyJhbGciOiJIUzI1NiJ9.YmUzNTFjMzItY2QzMS00ZWYzLWE0NDYtMWFlNmFlZTU1OGJi.kFawzPllutYXj022YGFc5BpIOlghD9sWXhj6GXL0SPE"
        }
    })
    async Create(@Req() req: Request, @Body() body: ResultCreateDto, ) {

        return await this.resultsService.CreateResult(body, false)
    }

    @UseGuards(JwtAuthGuard)
    @Post("/ielts/create")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: "Ielts Natija qo'shish"
    })
    @ApiHeader({
        name: 'Authorization',
        allowEmptyValue: false,
        required: true,
        schema: {
            example: "Bearer eyJhbGciOiJIUzI1NiJ9.YmUzNTFjMzItY2QzMS00ZWYzLWE0NDYtMWFlNmFlZTU1OGJi.kFawzPllutYXj022YGFc5BpIOlghD9sWXhj6GXL0SPE"
        }
    })
    async CreateIelts(@Req() req: Request, @Body() body: IeltsCreateDto, ) {

        return await this.resultsService.CreateResult(body, true)
    }

    @UseGuards(JwtAuthGuard)
    @Patch("update")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: "Natijani o'zgartirish"
    })
    @ApiHeader({
        name: 'Authorization',
        allowEmptyValue: false,
        required: true,
        schema: {
            example: "Bearer eyJhbGciOiJIUzI1NiJ9.YmUzNTFjMzItY2QzMS00ZWYzLWE0NDYtMWFlNmFlZTU1OGJi.kFawzPllutYXj022YGFc5BpIOlghD9sWXhj6GXL0SPE"
        }
    })
    async Update(@Req() req: Request, @Body() body: ResultUpdateDto | IeltsUpdateDto) {

        return await this.resultsService.updateResult(body)
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        description: "natijani o'chirish"
    })
    @Delete("delete")
    async Delete(@Body() body: ResultDeleteDto) {
        return await this.resultsService.deleteResult(body)
    }
}
