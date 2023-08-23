import { IsOptional, IsString } from "class-validator"
import { Transform, Type } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger";

export class UserUpdateDto {
    @ApiProperty({name: "id", type: "string", required: true, example: "88a9e3da-1240-48e5-b613-fe5cffe4f6a7"})
    @IsString()
    readonly id: string;

    @ApiProperty({name: "status", type: "boolean", required: false, example: true})
    @IsOptional()
    @IsString()
    readonly status: string;
}