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
                user: 'thindwacyrus86@gmail.com',
                clientId:'997476500619-6orfa7qngh759tbkrp6ek46srbu9pa2o.apps.googleusercontent.com',
                clientSecret: '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',
                //refreshToken: '',
                //accessToken: ''
            }
        });
    }

    async sendPasswordResetEmail(to:string, token:string){
        const resetLink = `http://localhost:3000/reset-password?token=${token}`
        const mailOptions = {
            from: 'Auth-backend service',
            to: to,
            subject: 'Password Reset Request',
            html:`<p>you requested a password reset. Click the link below to reset your password:</p><p><a href="${resetLink}">Reset password</a></p>`
        }
        await this.transporter.sendMail(mailOptions)
    }

    async sendCreateAccountEmail(to:string,name:string){
        const mailOptions = {
            from:'',
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

    async sendShopCreatedEmail(to:string,onwer:string,shopName:string){
        const mailOptions = {
            from : '',
            to: to,
            Subject:'',
            text:``
        }
        await this.transporter.sendMail(mailOptions)
    }
}