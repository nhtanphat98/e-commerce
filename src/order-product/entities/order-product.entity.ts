import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'order' })
export class OrderProduct {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    user_id: number;
    @Column()
    payment_id: number;
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}