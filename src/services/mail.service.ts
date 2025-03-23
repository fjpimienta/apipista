import transporter from '../config/mailer.js';
import { IMailOptions } from '../interfaces/email.interface.js';
import { SentMessageInfo } from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

class MailService {
  email_admin = process.env.EMAIL_ADMIN!;
  company = process.env.COMPANY!;
  send(mail: IMailOptions): Promise<{ status: boolean; message: string; mail?: IMailOptions }> {
    return new Promise((resolve, reject) => {
      transporter.sendMail({
        from: `"${this.company} - " ${this.email_admin}`,
        to: mail.to,
        subject: mail.subject,
        html: mail.html,
      }, (error: Error | null, info: SentMessageInfo) => {
        if (error) {
          reject({
            status: false,
            message: error.message,
          });
        } else {
          resolve({
            status: true,
            message: `${this.company} - El Correo electronico se ha enviado de forma correcta para ${mail.to}`,
            mail,
          });
        }
      });
    });
  }
}

export default MailService;
