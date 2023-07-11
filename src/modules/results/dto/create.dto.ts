import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, IsOptional, Length, IsArray, IsBoolean } from "class-validator"
import { ApiProperty } from "@nestjs/swagger";

export class ResultCreateDto {
    @ApiProperty({name: "fullname", type: "string", required: true, example: "Sherali Jo'rayev"})
    @IsString()
    readonly fullname: string;

    @ApiProperty({name: "year", type: "int", required: true, example: 2023})
    @IsString()
    readonly year: number;

    @ApiProperty({name: "point", type: "int", required: true, example: 145.1})
    @IsString()
    readonly point: number;

    @ApiProperty({name: "university", type: "string", required: true, example: "TATU"})
    @IsString()
    readonly university: string;

    @ApiProperty({name: "status", type: "string", required: false, example: "grand yoki kontrakt"})
    @IsString()
    readonly status: string;
}

export class IeltsCreateDto {
    @ApiProperty({name: "fullname", type: "string", required: true, example: "Sherali Jo'rayev"})
    @IsString()
    readonly fullname: string;

    @ApiProperty({name: "year", type: "int", required: true, example: 2023})
    @IsString()
    readonly year: number;

    @ApiProperty({name: "point", type: "int", required: true, example: 8.5})
    @IsString()
    readonly point: number;

    @ApiProperty({name: "university", type: "string", required: true, example: "Cambridge Ielts"})
    @IsString()
    readonly university: string;
}