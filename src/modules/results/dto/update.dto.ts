import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, IsOptional, Length, IsArray, IsBoolean } from "class-validator"
import { ApiProperty } from "@nestjs/swagger";

export class ResultUpdateDto {

    @ApiProperty({name: "id", type: "string", required: true, example: "88a9e3da-1240-48e5-b613-fe5cffe4f6a7"})
    @IsString()
    readonly id: string;

    @ApiProperty({name: "fullname", type: "string", required: false, example: "Sherali Jo'rayev"})
    @IsString()
    readonly fullname: string;

    @ApiProperty({name: "year", type: "int", required: false, example: 2023})
    @IsString()
    readonly year: number;

    @ApiProperty({name: "point", type: "int", required: false, example: 109})
    @IsString()
    readonly point: number;

    @ApiProperty({name: "university", type: "string", required: false, example: "O'zmu"})
    @IsString()
    readonly university: string;

    @ApiProperty({name: "status", type: "string", required: false, example: "grand yoki kontrakt"})
    @IsString()
    readonly status: string;

}


export class IeltsUpdateDto {

    @ApiProperty({name: "id", type: "string", required: true, example: "88a9e3da-1240-48e5-b613-fe5cffe4f6a7"})
    @IsString()
    readonly id: string;

    @ApiProperty({name: "fullname", type: "string", required: false, example: "Sherali Jo'rayev"})
    @IsString()
    readonly fullname: string;

    @ApiProperty({name: "year", type: "int", required: false, example: 2023})
    @IsString()
    readonly year: number;

    @ApiProperty({name: "point", type: "int", required: false, example: 9.0})
    @IsString()
    readonly point: number;

    @ApiProperty({name: "university", type: "string", required: false, example: "Oxford Ielts"})
    @IsString()
    readonly university: string;;

}