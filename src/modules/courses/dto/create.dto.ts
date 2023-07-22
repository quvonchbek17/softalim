import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, IsOptional, Length, IsArray } from "class-validator"
import { Transform, Type } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger";

export class CourseCreateDto {
    @ApiProperty({name: "name", type: "string", required: true, example: "Matematika"})
    @IsString()
    readonly name: string;

    @ApiProperty({name: "desc", type: "string", required: true, example: "kurs haqida description"})
    @IsString()
    readonly desc: string;

    @ApiProperty({name: "price", type: "integer", required: false, example: 1200000})
    @Type(() => Number)
    @IsNumber()
    readonly price: bigint;

    @ApiProperty({ type: 'string', format: 'binary', required: true })
    image: Express.Multer.File
}