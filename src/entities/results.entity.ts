import { Entity, Column } from 'typeorm'
import { BaseModel } from './model.entity';

@Entity("results")
export class ResultsRepository extends BaseModel {

    @Column({
        name: 'fullname',
        type: 'varchar'
    })
    fullname: string;

    @Column({
        name: 'year',
        type: 'int'
    })
    year: number;

    @Column({
        name: 'university',
        type: 'text',
        nullable: true
    })
    university: string;

    @Column({
        name: 'point',
        type: 'numeric'
    })
    point: number;

    @Column({
        name: 'status',
        type: 'varchar',
        nullable: true
    })
    status: string;

    @Column({
        name: 'isIelts',
        type: 'bool',
        nullable: true
    })
    isIelts: boolean;
}