import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, IsOptional, Length, IsArray } from "class-validator"
import { Transform, Type } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger";

export class CourseUpdateDto {
    @ApiProperty({name: "id", type: "string", required: true, example: "88a9e3da-1240-48e5-b613-fe5cffe4f6a7"})
    @IsString()
    readonly id: string;

    @ApiProperty({name: "name", type: "string", required: false, example: "Matematika"})
    @IsString()
    readonly name: string;

    @ApiProperty({name: "desc", type: "string", required: false, example: "kurs haqida description"})
    @IsString()
    readonly desc: string;

    @ApiProperty({name: "price", type: "integer", required: false, example: 1200000})
    @IsString()
    readonly price: bigint;

    @ApiProperty({ type: 'string', format: 'binary', required: false })
    image: Express.Multer.File
}