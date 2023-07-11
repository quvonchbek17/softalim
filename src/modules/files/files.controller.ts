import { BadRequestException, Controller, Get, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("/api/v1/files")
@Controller('files')
export class FilesController {
    constructor(){}

    @Get("/:filename")
    async GetFile(@Param("filename") filename: string, @Res() res) {
        try {
            return res.sendFile(filename, { root: `../uploads/images` })
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}