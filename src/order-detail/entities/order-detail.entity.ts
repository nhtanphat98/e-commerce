
import { Order } from 'src/order/entities/order.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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
  orderId: number;
  @Column()
  quantity: number;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
  @ManyToOne(() => Order, (order) => order.orderDetails, { cascade: true })
  @JoinColumn({name: 'orderId'})
  order: Order;
}
