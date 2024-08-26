import { Cart } from 'src/cart/entities/cart.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'cart-detail' })
export class CartDetail {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  product_id: number;
  @Column()
  cart_id: number;
  @Column()
  quantity: number;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
  @OneToOne(() => Cart, (cart) => cart.cartDetail, { cascade: true })
  @JoinColumn() // Sử dụng @JoinColumn ở phía giữ khóa ngoại
  cart: Cart;
}
