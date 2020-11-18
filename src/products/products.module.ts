import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/category/categorySchema/category.entity';
import { Product } from './productSchema/products.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { productCreateMiddleware } from './middleware/productCreate.middleware';
import { productUpdateMiddleware } from './middleware/productUpdate.middleware';
import { TermValue } from 'src/common/Entity/termValue.entity';


@Module({
    imports: [TypeOrmModule,TypeOrmModule.forFeature([Product],'ebhubon'),TypeOrmModule.forFeature([TermValue],'ebhubon')],
    controllers: [ ProductsController],
    providers: [ ProductsService],
    exports: [ProductsService,]



})
export class ProductsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
    //   consumer
    //     .apply(productCreateMiddleware)
    //     .forRoutes({path: 'products/create',method:RequestMethod.POST});
    //     consumer
    //     .apply(productUpdateMiddleware)
    //     .forRoutes({path: 'products/delete',method:RequestMethod.PUT},
    //     {path: 'products/update',method:RequestMethod.PUT});
  
    //   consumer
    //   .apply(CatUpdatedMiddleware)
    //   .exclude(
    //   { path: 'cats/registration', method: RequestMethod.POST }
    //  )
    //  .forRoutes(CatsController);
    }
}
