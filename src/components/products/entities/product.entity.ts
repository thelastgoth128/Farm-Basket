import { Reports } from "src/components/reports/entities/report.entity";
import { Shop } from "src/components/shop/entities/shop.entity";
import { Users } from "src/components/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Products {
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

    @Column()
    image : string 

    @ManyToOne(()=>Shop,shop=>shop.products)
    @JoinColumn({name:'shopid'})
    shop : Shop

    @OneToMany(()=>Reports,report=>report.product)
    reports : Reports[]
    

}
