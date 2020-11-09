import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors, Request } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { readdir, readdirSync, unlinkSync } from 'fs';
import { join, parse } from 'path';
import {diskStorage} from 'multer'
import { MediaService } from './media.service';
import { baseUrl }  from '../common/utils/config'
import jwt_decode from 'jwt-decode';
import { SellersService } from 'src/sellers/sellers.service';
import {mkdirSync} from 'fs';

import * as multer from 'jwt-decode'
const directoryPath = join(process.cwd(), '/upload')
const path=baseUrl+'/media/image/';

// export const upload = multer({
//     storage: multer.diskStorage({
//       destination: (req, file, callback) => {
//         let userId = req.user._id;
//         let path = `./public/uploads//${userId}`;
//         fs.mkdirsSync(path);
//         callback(null, path);
//       },
//       filename: (req, file, callback) => {
//         //originalname is the uploaded file's name with extn
//         callback(null, file.originalname);
//       }
//     })
//   });




@Controller('media')
export class MediaController {
    
    constructor(private readonly mediaService: MediaService) {}


    @Get('media')
    async findall(@Res() res){
        console.log("PATH================",baseUrl)
        //console.log("directoryPath=============",directoryPath);
        // console.log("findAll api Query: pageSize : ",pageSize," and current : ",current);
        readdir(directoryPath, function (err, files) {
            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            } 
            //listing all files using forEach
            files.forEach(function (file) {
                // Do whatever you want to do with the file
                console.log(file); 
            });
        });

        //console.log("__dirname=============",__dirname);

        var sync = readdirSync(directoryPath);
        //console.log("sync ===========", sync);

        var image = [];
        sync.forEach((file,index )=> { 
            image.push({
                uid : index+1,
                name: file,
                status: "done",
                url: path+file,
            })
            console.log(file); 
        }); 


        // sync.forEach(file => { 
        //     file['status']= "done";
        //     // var str=id++;
        //     file['url']=directoryPath+'/'+file;
        //     file['uid']=Date.now();
        //     // image.push({
        //     //     uid : toString(str),
        //     //     name: file,
        //     //     status: "done",
        //     //     url: directoryPath+'/'+file,
        //     // })
        //     console.log(file); 
        // }); 

        //console.log("image=========", image);
        //console.log(typeof(image))

        let read = { root: 'upload' };

        //console.log("root=============", __dirname);
        // return image;
 
        //var cats = await this.CatsService.findall()
        return res.json(image)
    }

    @Get('image/:imgpath')
    seeUploadedFile(@Param('imgpath') abs, @Res() res) {
        return res.sendFile(abs, { root: 'upload' });
    }

   
    @Post('deleteImage')
    deleteImage(@Body() body) {
        console.log(body);
        return unlinkSync(directoryPath+'/'+body.name)
    }

    
    // async mediaSeller(@Request() req) {
        //     console.log("current Seller Called===============")
        //     const header = req.headers.authorization
        //     const decoded = jwt_decode(header);
        //     this._shopName = await this.mediaService.mediaSeller(decoded);
        // }

    @Post('upload')
    @UseInterceptors(FileInterceptor('icon',
    {
        storage: diskStorage({
        destination: (req, file, callback) => {
            let dest = req.query.dest;
            let path = `upload/${dest}`;
            mkdirSync(path);
            callback(null, path);
            },
          filename: (req, file, cb) => {
          const randomName = parse(file.originalname).name.replace(" ", "-")+Date.now()+parse(file.originalname).ext;
          return cb(null, `${randomName}`)
        }
        }) 
      }))
    uploadFile(@UploadedFile() file) {
        console.log("FILE DETAILS==================",file)
        const response = {
            filename: file.originalname,
            //filename: file.filename,
        };
        console.log("response=======", response);
        console.log("file=======", file);
        return response;
    }



















}
