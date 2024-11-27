import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Users } from 'src/components/users/entities/user.entity';
import { Products } from 'src/components/products/entities/product.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @Column()
  comment: string;

  @ManyToOne(() => Users, users => users.reviews)
  user: Users;

  @ManyToOne(() => Products, product => product.reviews)
  product: Products;

}