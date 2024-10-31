import { Users } from "src/components/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    productid : number

    @ManyToOne(()=>Users,user=>user.userid)
    @JoinColumn({
        name :'userid'
    })
    userid : Users

    @Column()
    name : string

    @Column()
    description : string

    @Column()
    quantity : number

    @Column()
    price : number

    @Column()
    type: string
    

}
