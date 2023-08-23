import { Entity, Column } from 'typeorm'
import { BaseModel } from './model.entity';

@Entity("groups")
export class DirectionsRepository extends BaseModel {

    @Column({
        name: 'name',
        type: 'varchar'
    })
    name: string;

    @Column({
        name: 'facultyId',
        type: 'varchar'
    })
    facultyId: string;
}