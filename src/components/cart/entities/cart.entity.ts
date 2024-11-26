import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { Users } from 'src/components/users/entities/user.entity';
import { Products } from 'src/components/products/entities/product.entity';
import { Payments } from 'src/components/payment/entities/payment.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, user => user.cart)
  @JoinColumn({name : "userid"})
  user: Users;

  @OneToMany(() => CartItem, cartItem => cartItem.cart, { cascade: true })
  items: CartItem[];

  @OneToOne(()=>Payments,payment=>payment.cart)
  payment : Payments
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