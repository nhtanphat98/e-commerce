import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'category' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  name: string;
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
