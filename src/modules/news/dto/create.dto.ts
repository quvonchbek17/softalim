import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, IsOptional, Length, IsArray } from "class-validator"
import { Transform, Type } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger";

export class NewsCreateDto {
    @ApiProperty({name: "title", type: "string", required: true, example: "Rasman: Qurbon hayiti 28 iyun kuni nishonlanadi"})
    @IsString()
    readonly title: string;

    @ApiProperty({name: "desc", type: "string", required: false, example: "news description"})
    @IsString()
    readonly desc: string;

    @ApiProperty({ type: 'string', format: 'binary', required: true })
    image: Express.Multer.File
}