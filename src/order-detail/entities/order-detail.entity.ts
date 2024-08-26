import { Cart } from 'src/cart/entities/cart.entity';
import { Order } from 'src/order/entities/order.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'order-detail' })
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  product_id: number;
  @Column()
  order_id: number;
  @Column()
  quantity: number;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
  @OneToOne(() => Order, (order) => order.orderDetail, { cascade: true })
  @JoinColumn() // Sử dụng @JoinColumn ở phía giữ khóa ngoại
  order: Order;
}
