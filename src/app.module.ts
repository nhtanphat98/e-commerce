import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { OrderDetailModule } from './order-detail/order-detail.module';
import { CartModule } from './cart/cart.module';
import { CartDetailModule } from './cart-detail/cart-detail.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'admin',
        password: 'bi.,123456',
        database: configService.get('EC'),
        entities: [join(process.cwd(), 'dist/**/*.entity{.ts,.js}')],
        synchronize: true,
      }),
    }),
    ProductsModule,
    CategoriesModule,
    OrderModule,
    UserModule,
    OrderDetailModule,
    CartModule,
    CartDetailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
