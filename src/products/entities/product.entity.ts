import { Category } from 'src/categories/entities/category.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  name: string;
  @Column({ type: 'text', nullable: true })
  description: string;
  @Column()
  quantity: number;
  @Column({ nullable: true })
  categoryId: number;
  @Column()
  price: number;
  @Column({ nullable: true })
  image: string;
  @Column({ default: 'available' })
  status: string;
  @Column({ default: 5 })
  rating: number;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @BeforeInsert()
  @BeforeUpdate()
  updateStatus() {
    if (this.quantity > 0) {
      this.status = 'available';
    } else {
      this.status = 'out of stock';
    }
  }
}
