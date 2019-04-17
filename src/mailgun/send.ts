import { Error as MailgunError, messages } from 'mailgun-js';
import mailgun from './instance';

const send = (sender: string, to: string, subject: string, message: string) => {
  // tslint:disable-next-line:no-any
  return new Promise((resolve: (value?: any) => void, reject: (value?: any) => void) => {
    mailgun.messages().send({
      from: sender,
      to,
      subject,
      text: message
    }, (error: MailgunError, body: messages.SendResponse) => {
      if (error) {
        reject(error);
      }

      resolve(body);
    })
  })
};

export default send;
