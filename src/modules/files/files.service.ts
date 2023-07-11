import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class FilesService {
    constructor(){}

    async deleteFiles(folder: string, fileName: string){
        await fs.unlink(`../uploads/${folder}/${fileName}`, (err) => {
            if(err) {
                return new InternalServerErrorException()
            }
        })
    }
}
