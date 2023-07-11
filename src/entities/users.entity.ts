import { Entity, Column } from 'typeorm'
import { BaseModel } from './model.entity';

@Entity("users")
export class UsersRepository extends BaseModel {

    @Column({
        name: 'fullname',
        type: 'varchar',
        unique: false
    })
    fullname: string;

    @Column({
        name: 'phone',
        type: 'varchar'
    })
    phone: string;

    @Column({
        name: 'status',
        type: 'boolean',
        default: false
    })
    status: boolean;
}