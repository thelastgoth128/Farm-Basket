import { Injectable } from "@nestjs/common";
import { Subject } from "rxjs";
import * as nodemailer from 'nodemailer'

@Injectable()
export class MailService{
    private transporter: nodemailer.Transporter

    constructor(){
        this.transporter = nodemailer.createTransport({
            service:'Gmail',
            auth: {
                user: process.env.APP_EMAIL,
                pass:process.env.APP_PASSWORD
            }
        });
    }

    async sendPasswordResetEmail(to:string, token:string){
        const resetLink = `http://localhost:3000/reset-password?token=${token}`
        const mailOptions = {
            from: 'thelastgoth',
            to: to,
            subject: 'Password Reset Request',
            html:`
            <div> style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2>Password Reset Request</h2>
                <p>Click the link below to reset your password:</p>
                <a href="${resetLink}">Reset Password</a>
                <p>If you did not request this, please ignore this email.</p>
            </div>  
            `,
        }
        await this.transporter.sendMail(mailOptions)
    }

    async sendCreateAccountEmail(to:string,name:string){
        const mailOptions = {
            from:'thelastgoth128',
            to:to,
            subject: 'Welcome to Farm-Basket',
            html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #4CAF50;">Hey ${name},</h2>
                <p>We're thrilled to have you join our community! <strong>Farm-Basket</strong> is a centralized marketplace for Malawi's agricultural sector, enabling farmers and agricultural enterprises to showcase and sell their products. The app aims to streamline market access, enhance distribution efficiency, and support economic growth by bridging the gap between producers and consumers.</p>
                <p><strong>Here's how you can get started:</strong></p>
                <ol>
                    <li><strong>Explore:</strong> Dive into different categories and check out the products you want.</li>
                    <li><strong>Connect:</strong> Send us emails on how we can improve the app to meet your needs.</li>
                    <li><strong>Customize:</strong> Personalize your profile and settings to get the most out of your experience.</li>
                </ol>
                <p>If you ever have any questions or need assistance, our support team is here for you. Simply reach out to <a href="mailto:farmbasketsupport@gmail.com">farmbasketsupport@gmail.com</a>.</p>
                <p>Welcome aboard!</p>
                <p>Warm regards,</p>
                <p><strong>The Farm-Basket Team</strong></p>
            </div>
        `
        }
        await this.transporter.sendMail(mailOptions)
    }

    async sendShopCreatedEmail(to:string,owner:string,shopName:string){
        const mailOptions = {
            from : 'thelastgoth128',
            to: to,
            subject: 'Congratulations on Creating Your Shop!',
            html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #4CAF50;">Congratulations, ${owner}!</h2>
                <p>We are thrilled to inform you that your shop <strong>${shopName}</strong> has been created successfully!</p>
                      
                <h3 style="color: #333;">Here’s How to Get Started:</h3>
                      
                <h4 style="color: #4CAF50;">1. Post Your Products</h4>
                <p>To start adding products to your shop, follow these steps:</p>
                <ul style="padding-left: 20px;">
                <li>Login to your account and go to <strong>"My Shop"</strong>.</li>
                <li>Click on the <strong>"Add Product"</strong> button.</li>
                <li>Fill in the details about your product, upload images, and set the price.</li>
                <li>Click <strong>"Submit"</strong> to add the product to your shop.</li>
                </ul>
                    
                <h4 style="color: #4CAF50;">2. View and Manage Reviews</h4>
                <p>You can see reviews from buyers by:</p>
                <ul style="padding-left: 20px;">
                <li>Going to <strong>"My Shop"</strong> and clicking on <strong>"Product Reviews"</strong>.</li>
                <li>Review and respond to customer feedback to build trust and improve your shop’s rating.</li>
                </ul>
                      
                <h4 style="color: #4CAF50;">3. Interact with Buyers</h4>
                <p>Engage with your buyers to enhance their shopping experience:</p>
                <ul style="padding-left: 20px;">
                <li>Respond to inquiries and messages promptly.</li>
                <li>Offer excellent customer service and support.</li>
                <li>Provide updates on order status and shipping details.</li>
                </ul>
                   
                <h4 style="color: #4CAF50;">4. Sell Your Products</h4>
                <p>Boost your sales with these tips:</p>
                <ul style="padding-left: 20px;">
                <li>Promote your products on social media and other platforms.</li>
                <li>Offer discounts and special deals to attract more buyers.</li>
                <li>Keep your product listings updated with accurate information.</li>
                </ul>
                      
                <p>We are excited to see your shop grow and succeed! If you have any questions or need assistance, feel free to contact our support team.</p>
                      
                <p style="color: #333;">Best Regards,</p>
                p style="color: #333;">The Shop Team</p>
            </div>
        `,
    };               
    await this.transporter.sendMail(mailOptions)
    }
}