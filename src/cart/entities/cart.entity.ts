import { CartDetail } from 'src/cart-detail/entities/cart-detail.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'cart' })
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  user_id: number;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
  @ManyToOne(() => User, (user) => user.carts)
  user: User;
  @OneToOne(() => CartDetail, (cartDetail) => cartDetail.cart)
  cartDetail: CartDetail;
}
