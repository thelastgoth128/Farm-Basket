import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Users } from "src/components/users/entities/user.entity";


export const typeOrmConfig : TypeOrmModuleOptions ={
    type : 'postgres',
    host : 'localhost',
    port : 5432,
    username : 'postgres',
    password : 'thelastgoth128',
    database : 'farm-basket',
    entities : [Users],
    synchronize : false


}