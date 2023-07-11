import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, IsOptional, Length, IsArray } from "class-validator"
import { Transform, Type } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger";

export class TeacherUpdateDto {
    @ApiProperty({name: "id", type: "string", required: true, example: "88a9e3da-1240-48e5-b613-fe5cffe4f6a7"})
    @IsString()
    readonly id: string;

    @ApiProperty({name: "fullname", type: "string", required: false, example: "Eshmat Toshmatov"})
    @IsString()
    readonly fullname: string;

    @ApiProperty({name: "desc", type: "string", required: false, example: "18 yillik tajribaga ega juda kuchli ustoz"})
    @IsString()
    readonly desc: string;

    @ApiProperty({name: "specialty", type: "string", required: false, example: "Matematika"})
    @IsString()
    readonly specialty: string;

    @ApiProperty({name: "experience", type: "int", required: false, example: 18})
    @IsString()
    readonly experience: number;

    @ApiProperty({ type: 'string', format: 'binary', required: false })
    image: Express.Multer.File

}