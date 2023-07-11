import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator'

export class Sign {
    @IsString()
    @ApiProperty({ type: 'string', example: 'eshmat', required: true})
    adminname: string;

    @IsString()
    @ApiProperty({ type: 'string', example: '1111', required: true })
    password: string;
}
