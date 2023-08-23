import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, IsOptional, Length, IsArray } from "class-validator"
import { Transform, Type } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger";

export class NewsUpdateDto {
    @ApiProperty({name: "id", type: "string", required: true, example: "88a9e3da-1240-48e5-b613-fe5cffe4f6a7"})
    @IsString()
    readonly id: string;

    @ApiProperty({name: "title", type: "string", required: false, example: "Rasman: Qurbon hayiti 28 iyun kuni nishonlanadi"})
    @IsOptional()
    @IsString()
    readonly title: string;

    @ApiProperty({name: "desc", type: "string", required: false, example: "news description"})
    @IsOptional()
    @IsString()
    readonly desc: string;

    @ApiProperty({ type: 'string', format: 'binary', required: false })
    @IsOptional()
    image: Express.Multer.File

}