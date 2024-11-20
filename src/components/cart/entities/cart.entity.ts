import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Users } from 'src/components/users/entities/user.entity';
import { Products } from 'src/components/products/entities/product.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, user => user.cart)
  user: Users;

  @OneToMany(() => CartItem, cartItem => cartItem.cart, { cascade: true })
  items: CartItem[];
}

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cart, cart => cart.items)
  cart: Cart;

  @ManyToOne(() => Products, product => product.id)
  product: Products;

  @Column('int')
  quantity: number;
}