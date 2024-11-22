import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Users } from 'src/components/users/entities/user.entity';
import { Products } from 'src/components/products/entities/product.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, user => user.cart)
  @JoinColumn({name : "userid"})
  user: Users;

  @OneToMany(() => CartItem, cartItem => cartItem.cart, { cascade: true })
  items: CartItem[];
}

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cart, cart => cart.items)
  @JoinColumn({name : "cart"})
  cart: Cart;

  @ManyToOne(() => Products, product => product.cart)
  @JoinColumn({name : "product"})
  product: Products;

  @Column('int')
  quantity: number;
}