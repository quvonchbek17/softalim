import { Request, Body, Controller, Post, Req, HttpCode, HttpStatus, Patch, Get, Param, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags, ApiConsumes } from '@nestjs/swagger';
import { RegisterUserService } from './register-user.service';
import { UserCreateDto } from './dto/create.dto';
import { UserUpdateDto } from './dto/update.dto';
import { UserDeleteDto } from './dto/delete.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
@ApiTags("/api/v1/users")
@Controller('users')
export class RegisterUserController {
    constructor(
        private readonly usersService: RegisterUserService
    ){}

    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        description: "Barcha userlarni olish uchun"
    })
    @Get()
    async GetUsers() {
        return await this.usersService.getUsers()
    }

    @UseGuards(JwtAuthGuard)
    @Post("create")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: "User qo'shish"
    })
    @ApiHeader({
        name: 'Authorization',
        allowEmptyValue: false,
        required: true,
        schema: {
            example: "Bearer eyJhbGciOiJIUzI1NiJ9.YmUzNTFjMzItY2QzMS00ZWYzLWE0NDYtMWFlNmFlZTU1OGJi.kFawzPllutYXj022YGFc5BpIOlghD9sWXhj6GXL0SPE"
        }
    })
    async Create(@Req() req: Request, @Body() body: UserCreateDto) {
        return await this.usersService.CreateUser(body)
    }
    @UseGuards(JwtAuthGuard)
    @Patch("update")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: "Userni statusini o'zgartirish (faqat idni yuborish yetarli. statusi teskarisiga o'zgaradi)"
    })
    @ApiHeader({
        name: 'Authorization',
        allowEmptyValue: false,
        required: true,
        schema: {
            example: "Bearer eyJhbGciOiJIUzI1NiJ9.YmUzNTFjMzItY2QzMS00ZWYzLWE0NDYtMWFlNmFlZTU1OGJi.kFawzPllutYXj022YGFc5BpIOlghD9sWXhj6GXL0SPE"
        }
    })
    async Update(@Req() req: Request, @Body() body: UserUpdateDto) {
        return await this.usersService.updateUser(body)
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        description: "Userni o'chirish"
    })
    @Delete("delete")
    async Delete(@Body() body: UserDeleteDto) {
        return await this.usersService.deleteUser(body)
    }
}
