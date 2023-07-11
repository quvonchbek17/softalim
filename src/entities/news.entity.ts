import { Entity, Column } from 'typeorm'
import { BaseModel } from './model.entity';

@Entity("news")
export class NewsRepository extends BaseModel {

    @Column({
        name: 'title',
        type: 'text'
    })
    title: string;

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
        name: 'view',
        type: 'bigint',
        default: 0
    })
    view: number;
}