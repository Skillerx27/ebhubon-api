import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Category } from './categorySchema/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,TreeRepository,getRepository, getMongoRepository ,ObjectID, createConnection, getConnectionManager} from 'typeorm';
import { Mongoose } from 'mongoose'
import { categoryinterface } from './categorySchema/category.interface';
import { Seller } from 'src/sellers/sellerSchema/seller.entity';
import {getConnection} from "typeorm";
import { userInfo } from 'os';
import { LOADIPHLPAPI } from 'dns';

import {ObjectId,ObjectID as ObjID} from 'mongodb'
import { async, empty } from 'rxjs';
import { User } from 'src/users/userSchema/user.entity';
import { categoryDto } from './categorySchema/category.dto';
import { ProductDto } from 'src/products/productSchema/product.dto';
import { isEmpty } from 'class-validator';
import { categoryAttrDto } from './categorySchema/categoryAttr.dto';
import { CategoryAttribute } from './categorySchema/categoryWiseAttr.entity';
import { TermValue } from 'src/common/Entity/termValue.entity';
import { Term } from 'src/common/Entity/term.entity';

@Injectable()
export class CategoryService {
    constructor( 
    @InjectRepository(TermValue,'ebhubon') private readonly termValueRepository: Repository<TermValue>,
    @InjectRepository(Term,'ebhubon') private readonly termRepository: Repository<Term>
    ) {}

      async delete(id: string) {
        await this.termValueRepository.delete(id);
      }



    //find all the roots
    async findAll(): Promise<any> {
        let data=await this.termValueRepository.find()
        return data;
      }



      //find the entire sub-tree 
      async getChild(username: string): Promise<any>  {
        console.log(username);
        let data= await this.termValueRepository.findOne({
          where:{title:username},
        })
        console.log("Data==============", data);
        let pID = data.id;
        console.log(pID);
        const sub_category=await this.termValueRepository.find({
          where:{parentId:pID},
        })
        console.log("SUB CATEGORYS=============",sub_category);
        return sub_category;
        //await this.categoryRepository.delete(name);

        
      }

      //find entire category tree
      async getallChild(): Promise<any> {
        let categoryArray = await this.termValueRepository.find({where:{parentTermValue:null},relations: [
        'childTermValues',
        'childTermValues.childTermValues',
        'childTermValues.childTermValues.childTermValues'
        ]})

        const iterate = (obj) => {
          Object.keys(obj).forEach(key => {
          if(obj[key].length === 0) delete obj[key]
          if (typeof obj[key] === 'object') {
                  iterate(obj[key])
              }
          })
          return obj;
        }
        return iterate(categoryArray)

      }
     
      
      // async createCategory(username: string, c_details: Category): Promise<Category> {
      //   console.log(username);
      //   let data= await this.categoryRepository.findOne({
      //     where:{title:username},
      //   })
       
      //   console.log("Data==============", data);
        
      //   let pID = data.parentId;

      //   console.log(pID);
      //   if(pID==null)
      //   {
          
      //     // var x = JSON.stringify(data)
      //     // console.log("JSON AS STRING===========",typeof x)
      //     // console.log("JSON AS STRING===========",x)
      //     // var x = JSON.parse(x)
      //     // console.log("JSON AS STRING===========",typeof x)
      //     // console.log("JSON AS STRING===========",Object(x.parentId))
      //     const categoryx = await  this.categoryRepository.save(c_details);
      //     return categoryx;
      //   }
      //   else
      //   {
      //     const categoryx = await  this.categoryRepository.save(c_details);
      //   }
      //   // const sub_category=await this.categoryRepository.find({
      //   //   where:{parentId:pID},
      //   // })

      //   console.log("SUB CATEGORYS=============",c_details);
      //   return c_details;
      //   //await this.categoryRepository.delete(name);

      //   return this.categoryRepository.findOne(username);
      // }

      
    

      // async create(data: any):Promise<any> {
      //     if (data.parentCategories){
      //     data.parentId = new ObjID (data.parentCategories[data.parentCategories.length-1])
      //   } else {
      //    data.parentId = null
      //   }
      //   const new_category = await  this.categoryRepository.save(data);
      //   return data;
      // }

      //creating fresh category
      async createcategory(data: any, mail :string ) {
        let createdCategory : TermValue
        try{
          console.log("ADDED CATEGORY DATA=================",data)
          data.images = { icon : data.icon,image:data.image,banner:data.banner}

          if(data.parentCategories) {
            let parentId = data.parentCategories[data.parentCategories.length-1]
            let tv = await this.termValueRepository.findOne(parentId)
            data.parentTermValue =  tv;
          }
          console.log(data.images);
          data.createdAt = new Date()
          data.createdBy = mail
          createdCategory =  await this.termValueRepository.save(data)
        }catch(err) {
          return err.writeErrors[0].errmsg        
        }
        return  createdCategory
      }

      
      
      async showSubCategory(): Promise<any> {
        return await this.termValueRepository.find({where:{parentTermValue:null},relations: ['childTermValues', 'childTermValues.childTermValues']})
        
        // const result = await this.termValueRepository.find();

        // let termValues = []
        // for (let i = 0; i < result.length; i++) {
        //     const childTermValues:TermValue = await  this.termValueRepository.findOne({where:{id:result[i].id}, relations: ['childTermValues']});
        //     termValues.push(childTermValues) 

        // }
        // return termValues


        // let parent=await this.termValueRepository.find({
        //   where:{parentTermValueId:null},
        // })
        // for(let i=0; i<parent.length; i++)
        // {
        //   let child=await this.termValueRepository.find({
        //     where:{parentTermValueId:parent[i].id},
        //   })    
        //   // //if(Object.keys(child).length) parent[i].children=child;
        //   if(child!=null)
        //   {
        //      for(let j=0; j<child.length; j++)
        //      { 
        //       let subchild=await this.termValueRepository.find({
        //         where:{parentId:child[j].id},
        //       })
        //       // //if(Object.keys(subchild).length) child[j].children=subchild;
        //      }
        //   }
        // }
        // return parent;
        
      }

      //update
      // async updateList(data: any) {
      //   console.log("status", data["status"]);
      //   for (let key in data) {
      //       if (data.hasOwnProperty(key) && key!="status") {
      //           // data[key].status = data["status"];
      //           // data[key].updatedAt= new Date()
      //           // data[key].updatedBy = data.mail
      //           // // let sellerId = new sellers();
      //           // // sellerId._id =data[key]._id;
      //           // // sellerId._id = data[key]._id 
      //           // let _id  = data[key]._id;
      //           // // tmp = new ObjID(tmp)
      //           // console.log("_id",_id);
      //           // delete data[key]._id;
      //           // // let x = await this.sellerinfoRepository.update({_id}, data[key]); 
      //           // let x = await this.categoryRepository.findOne(_id); 
      //           // //delete x.shopName;
      //           // //delete x.role;
      //           // delete x.status;
      //           // //delete x.cellNo;
      //           // //delete x.mail;
      //           // console.log("x======",x);
      //           // let xup = await this.categoryRepository.update(x,data[key]); 
      //           // console.log("Vlaue=================",xup)
      //           data[key].status = data["status"];
      //           data[key].updatedAt = new Date()
      //           data[key].updateBy = data.mail
      //           let _id  = data[key]._id;
      //           delete data[key]._id;
      //           let xup = await this.categoryRepository.update(_id, data[key]);
      //       }
      //     }
      //     return data;
      //   // console.log("ID====================",_id);
      //   // await this.sellerinfoRepository.update({_id}, data); 
      //   // return await this.sellerinfoRepository.findOne(_id)
      //   //return this.sellerinfoRepository.update({_id}, data);
      // }

      // async update(data: Category) {
      //   let categoryID = data._id
      //   // if (data.parentCategories){
      //   //   data.parentId  =  (data.parentCategories[data.parentCategories.length-1])
      //   //   let categoryTitle = (await this.categoryRepository.findOne(data.parentId)).title
      //   //   data.parentCategoryTitle =  categoryTitle
      //   // }
      //   // else{
      //   //   data.parentCategories = null 
      //   //   data.parentCategoryTitle = null
      //   //   data.parentId = null
      //   // }
      //   delete data._id 
      //   let UpdatedData = await this.categoryRepository.update(categoryID,data); 
      //   return UpdatedData;
      // }



      // // async attributeCreate(data: categoryAttrDto ) {
      // //   const asd = getMongoRepository(CategoryWiseAttr,'ebhubon')

      // //   const photo1 = new CategoryWiseAttr();
      // //   photo1.attrTitle = "Brand";
      // //   await this.catAttributeRepository.save(photo1);

      // //   const user = new Category();
      // //   user.title = "John";
      // //   user.slug = "asdf"
      // //   user.categoryWiseAttrs = [photo1];
        
      // //   return await this.categoryRepository.save(user);
      // // }


      // async attributeCreate(data  ) {
      //   if (!data.categoryId){
      //       data.categoryId = data.categoriesId[data.categoriesId.length-1]
      //       delete data.categoriesId
      //   }
      //   return await this.categoryAttributeRepository.save(data);
      // }

      // async attributeGet(): Promise<any> {
      //   let data =await this.categoryAttributeRepository.find()
      //   return data;
      // }

      // async attributeUpdate(data: any) {
      //   let userId = data._id
      //   delete data._id 
      //   let UpdatedData = await this.categoryAttributeRepository.update(userId,data); 
      //   return UpdatedData;
      // }

      // async attributeDelete(id: string) {
      //   const data = await this.categoryAttributeRepository.delete(id);
      //   if (!data)
      //   {
      //     throw new HttpException('Not found',HttpStatus.NOT_FOUND)
      //   }
      //   return data
      // }

      // async findspecific(catId: string) {
      //   const data = await this.categoryAttributeRepository.find({categoryId:catId});
      //   if (!data)
      //   {

      //       throw new HttpException('Not found',HttpStatus.NOT_FOUND)
      //   }
      //   return data
      // }



}
