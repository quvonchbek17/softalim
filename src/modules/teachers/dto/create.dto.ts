import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, IsOptional, Length, IsArray } from "class-validator"
import { Transform, Type } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger";

export class TeacherCreateDto {
    @ApiProperty({name: "fullname", type: "string", required: true, example: "Eshmat Toshmatov"})
    @IsString()
    readonly fullname: string;

    @ApiProperty({name: "desc", type: "string", required: true, example: "18 yillik tajribaga ega juda kuchli ustoz"})
    @IsString()
    readonly desc: string;

    @ApiProperty({name: "specialty", type: "string", required: true, example: "Matematika"})
    @IsString()
    readonly specialty: string;

    @ApiProperty({name: "experience", type: "integer", required: true, example: 18})
    @IsNumber()
    readonly experience: number;

    @ApiProperty({ type: 'string', format: 'binary', required: true })
    image: Express.Multer.File

}