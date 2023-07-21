import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import path from 'path';

@Injectable()
export class FilesService {
    constructor(){}

    async deleteFiles(folder: string, fileName: string){
        await fs.unlink(path.join(process.cwd(), "..", "uploads", folder, fileName), (err) => {
            if(err) {
                return new InternalServerErrorException()
            }
        })
    }
}
