import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import { Injectable } from '@nestjs/common';
@Injectable()
export class MailService {
  readonly transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'process.env.SMTP_HOST as unknown as string',
      // host: 'smtp.ukr.net',
      port: 465,
      // port: 465,
      secure: true,
      // auth: {
      //   user: process.env.SMTP_USER,
      //   // user: 'megaprojecttest@ukr.net',
      //   pass: process.env.SMTP_PASSWORD,
      //   // pass: 'd6uHzWltFtfGaGjN',
      // },
    });
  }

  async sendActivationMail(to: string, html: string) {
    console.log(to);
    console.log(html);
    const message = {
      from: 'Nodemailer <example@nodemailer.com>',
      to,
      subject: 'AMP4EMAIL message',
      text: 'For clients with plaintext support only',
      html: '<p>For clients that do not support AMP4EMAIL or amp content is not valid</p>',
      amp: `<!doctype html>
    <html ⚡4email>
      <head>
        <meta charset="utf-8">
        <style amp4email-boilerplate>body{visibility:hidden}</style>
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
      </head>
      <body>
        <p>Image: <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
        <p>GIF (requires "amp-anim" script in header):<br/>
          <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
      </body>
    </html>`,
    };
    await this.transporter.sendMail(message);
  }
}
