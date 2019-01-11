import nexmo from './nexmo';

export default (to: number, message: string, sender: number | string = "HackSoc Committee") => {
  nexmo.message.sendSms(sender, to, message);
};
