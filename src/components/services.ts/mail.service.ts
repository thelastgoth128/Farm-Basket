import { Injectable } from "@nestjs/common";
import { Subject } from "rxjs";
import * as nodemailer from 'nodemailer'

@Injectable()
export class MailService{
    private transporter: nodemailer.Transporter

    constructor(){
        this.transporter = nodemailer.createTransport({
            service:'gmail',
            auth: {
                type: 'OAuth2',
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
            Subject: 'Password Reset Request',
            html:`<p>you requested a password reset. Click the link below to reset your password:</p><p><a href="${resetLink}">Reset password</a></p>`
        }
        await this.transporter.sendMail(mailOptions)
    }
}