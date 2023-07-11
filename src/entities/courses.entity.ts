import { Entity, Column } from 'typeorm'
import { BaseModel } from './model.entity';

@Entity("courses")
export class CoursesRepository extends BaseModel {

    @Column({
        name: 'name',
        type: 'varchar',
        unique: true
    })
    name: string;

    @Column({
        name: 'desc',
        type: 'text'
    })
    desc: string;

    @Column({
        name: 'imgUrl',
        type: 'text'
    })
    imgUrl: string;

    @Column({
        name: 'price',
        type: 'bigint'
    })
    price: bigint;

    @Column({
        name: 'view',
        type: 'bigint'
    })
    view: number;
}