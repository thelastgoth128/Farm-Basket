import { Users } from "src/components/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Shop {

    @PrimaryGeneratedColumn()
    shopid : number
    
    @OneToOne(()=>Users,user=>user.userid)
    @JoinColumn({
        name : 'owner'
    })
    owner : Users

    @Column()
    name : string

}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
