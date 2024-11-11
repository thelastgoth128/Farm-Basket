import { Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CloudinaryService } from "../services.ts/cloudinary.service";
import { FileInterceptor } from "@nestjs/platform-express";
import * as path from "path";
import * as fs from 'fs'
import * as sharp from "sharp";
import { ImageService } from "./image.service";
import { Public } from "../auth/guards/public";

@Public()
@Controller('images')
export class ImageController{
    constructor(
        private readonly cloudinaryService : CloudinaryService,
        private readonly imageService : ImageService
    ){}

    @Post('upload')
    @UseInterceptors(FileInterceptor('image'))
    async uploadFile(@UploadedFile() file: Express.Multer.File,@Body('shopid') shopid:number) {
      try{
        const result = await this.cloudinaryService.uploadImage(file.path)
        await this.imageService.saveShopImageUrl(shopid,result.url)
        return result
      }catch(error) {
        console.error('Error uploading image: ', error);
        throw new Error('Failed to upload image')
      } 
    }

    @Post('product/image')
    @UseInterceptors(FileInterceptor('image'))
    async uploadImage(@UploadedFile() file: Express.Multer.File,@Body('productid') productid : number) {
      try{
        const result = await this.cloudinaryService.uploadImage(file.path)
        await this.imageService.saveProductImageUrl(productid,result.url)
        return result
      }catch(error) {
        console.error('Error uploading image: ', error);
        throw new Error('Failed to upload image')
      }
    }
}


