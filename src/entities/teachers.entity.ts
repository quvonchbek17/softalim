import { Entity, Column } from 'typeorm'
import { BaseModel } from './model.entity';

@Entity("teachers")
export class TeachersRepository extends BaseModel {

    @Column({
        name: 'fullname',
        type: 'varchar',
        unique: true
    })
    fullname: string;

    @Column({
        name: 'desc',
        type: 'text'
    })
    desc: string;

    @Column({
        name: 'specialty',
        type: 'varchar'
    })
    specialty: string;

    @Column({
        name: 'imgUrl',
        type: 'text'
    })
    imgUrl: string;

    @Column({
        name: 'experience',
        type: 'int'
    })
    experience: number;
}