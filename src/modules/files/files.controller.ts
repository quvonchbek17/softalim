import { BadRequestException, Controller, Get, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as path from 'path';

@ApiTags("/api/v1/files")
@Controller('files')
export class FilesController {
    constructor(){}

    @Get("/:folder/:filename")
    async GetFile(@Param("filename") filename: string, @Param("folder") folder: string, @Res() res) {
        try {
            return res.sendFile(filename, { root: path.join(process.cwd(), "..", "uploads", folder) })
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}