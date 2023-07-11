import { Entity, Column } from 'typeorm'
import { BaseModel } from './model.entity';

@Entity("admins")
export class AdminsRepository extends BaseModel {

    @Column({
        name: 'adminname',
        type: 'varchar',
        unique: true
    })
    adminname: string;

    @Column({
        name: 'password',
        type: 'varchar'
    })
    password: string;
}