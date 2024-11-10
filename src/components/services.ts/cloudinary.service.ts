import { UploadApiErrorResponse, UploadApiResponse, v2 } from "cloudinary";
import { error } from "console";


export class CloudinaryService {
    constructor(){
        v2.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        })
    }

    async uploadImage(
        filePath: string,
    ): Promise<UploadApiResponse | UploadApiErrorResponse> {
        return new Promise((resolve, reject) =>{
            v2.uploader.upload(filePath,{folder: 'farm-basket' }, (error,result)=>{
                if(error) {
                    return reject(error)
                }
                resolve(result);
            })
        })
    }
}