import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Shop } from "src/components/shop/entities/shop.entity";
import { Users } from "src/components/users/entities/user.entity";


export const typeOrmConfig : TypeOrmModuleOptions ={
    type : 'postgres',
    host : 'localhost',
    port : 5432,
    username : 'postgres',
    password : 'thelastgoth128',
    database : 'farm-basket',
    entities : [Users,Shop],
    synchronize : false


}