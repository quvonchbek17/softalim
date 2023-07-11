import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, IsOptional, Length, IsArray, Matches } from "class-validator"
import { ApiProperty } from "@nestjs/swagger";

export class UserCreateDto {
    @ApiProperty({name: "fullname", type: "string", required: true, example: "Sherali Jo'rayev"})
    @IsString()
    readonly fullname: string;

    @ApiProperty({name: "phone", type: "string", required: true, example: "+998912223344"})
    @IsString()
    readonly phone: string;
}