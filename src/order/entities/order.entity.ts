import { OrderDetail } from 'src/order-detail/entities/order-detail.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'order' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId: number;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({name: 'userId'})
  user: User;
  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  
  orderDetails: OrderDetail;
}
