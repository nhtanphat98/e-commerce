import { Product } from '../entities/product.entity';

export class ResponseProduct {
  data: Product[] = [];
  total: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}
