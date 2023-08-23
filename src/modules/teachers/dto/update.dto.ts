import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, IsOptional, Length, IsArray } from "class-validator"
import { Transform, Type } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger";

export class TeacherUpdateDto {
    @ApiProperty({name: "id", type: "string", required: true, example: "88a9e3da-1240-48e5-b613-fe5cffe4f6a7"})
    @IsString()
    readonly id: string;

    @ApiProperty({name: "fullname", type: "string", required: false, example: "Eshmat Toshmatov"})
    @IsOptional()
    @IsString()
    readonly fullname: string;

    @ApiProperty({name: "desc", type: "string", required: false, example: "18 yillik tajribaga ega juda kuchli ustoz"})
    @IsOptional()
    @IsString()
    readonly desc: string;

    @ApiProperty({name: "specialty", type: "string", required: false, example: "Matematika"})
    @IsOptional()
    @IsString()
    readonly specialty: string;

    @ApiProperty({name: "experience", type: "integer", required: false, example: 18})
    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    readonly experience: number;

    @ApiProperty({ type: 'string', format: 'binary', required: false })
    @IsOptional()
    image: Express.Multer.File

}