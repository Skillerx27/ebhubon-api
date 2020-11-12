import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe,Request, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './categorySchema/category.entity';
import { categoryInterface } from './categorySchema/category.interface';
import { ObjectID } from 'typeorm'
import { Seller } from 'src/sellers/sellerSchema/seller.entity';
import { categoryvalidator } from './categorySchema/validator.category';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/users/auth/jwt-auth.guard';
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}


    //find all the roots 
    @UseGuards(JwtAuthGuard)
    @Get('all')
    find(): Promise<categoryInterface> {
        return this.categoryService.findAll();
    }

    //find entire category tree
    @UseGuards(JwtAuthGuard)
    @Get('allChild')
    getallChild(): Promise<categoryInterface> {
        return this.categoryService.getallChild();
    }



    //find the subdomain category
    @UseGuards(JwtAuthGuard)
    @Get('specific')
    createCategory(@Param() params,@Body() user: Category) {
        return this.categoryService.createCategory(params.id,user);
    }

    
    @UseGuards(JwtAuthGuard)
    @Get('get/:id')
    getChild(@Param() params ): Promise<prodetailsInterface>  {
        return this.categoryService.getChild(params.id);
    }



    
    // @Post('create')
    // @UsePipes(new ValidationPipe())
    // create(@Body() user: Category ):Promise<Category> {
    //     console.log("category created")
    //     console.log("category created=========",user)

    //     return this.categoryService.create(user);
    // }




    @UseGuards(JwtAuthGuard)
    @Get('root')
    findbyroot(): Promise<Category> {
        return this.categoryService.findbyroot();
    }


    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Post('createCategory')
    createcategory(@Body() user: categoryInterface):Promise<categoryInterface> {
        console.log("clalled mysql post")
        return this.categoryService.createcategory(user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('showParentCategory')
    showSubCategory(): Promise<categoryInterface> {
        return this.categoryService.showSubCategory();
    }
    
    @UseGuards(JwtAuthGuard)
    @Post('delete')
    delete(@Body() body) {
        return this.categoryService.delete(body.id);
    }
    

    @UseGuards(JwtAuthGuard)
    @Post('update')
    update(@Body() params) {
        console.log("Seller CAlled===============",params)
        // console.log("asasdasdasdasd",params[0])
        // console.log(x.length)
        return this.categoryService.update(params);
    }


}
