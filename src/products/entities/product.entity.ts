import { Category } from 'src/categories/entities/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
  category_id: number;
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
}
