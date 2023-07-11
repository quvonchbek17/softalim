import { Entity, Column, BeforeInsert, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm'
import { BaseModel } from './model.entity';

@Entity("files")
export class FilesRepository extends BaseModel {

    @Column({
        name: 'uploadName',
        type: 'varchar',
        unique: true,
        nullable: true
    })
    uploadName: string;

    @Column({
        name: 'name',
        type: 'varchar',
        nullable: true
    })
    name: string;

    @Column({
        name: 'type',
        type: 'text',
        nullable: true
    })
    type: string;

    @Column({
        name: 'size',
        type: 'varchar',
        nullable: true
    })
    size: string;

    @Column({
        name: 'url',
        type: 'text',
        nullable: true
    })
    url: string;
}