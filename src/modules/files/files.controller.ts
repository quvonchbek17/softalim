import { BadRequestException, Controller, Get, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import path from 'path';

@ApiTags("/api/v1/files")
@Controller('files')
export class FilesController {
    constructor(){}

    @Get("/:filename")
    async GetFile(@Param("filename") filename: string, @Res() res) {
        try {
            return res.sendFile(filename, { root: path.join(process.cwd(), "..", "uploads") })
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}