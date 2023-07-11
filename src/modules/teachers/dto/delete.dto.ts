import { IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger";

export class TeacherDeleteDto {
    @ApiProperty({name: "id", type: "string", required: true, example: "88a9e3da-1240-48e5-b613-fe5cffe4f6a7"})
    @IsString()
    readonly id: string;
}