import send from '../mailgun/send';

const FROM = 'HackSoc Job Listings <no-reply@hacksoc.net>';
const APPROVE_SUBJECT = 'Your job listing has been approved';
const REJECT_SUBJECT = 'You job listing has been rejected';
const APPROVE_MESSAGE = "We're pleased to inform you that your job listing has been approved, and has been shared with our members.";
const REJECT_MESSAGE = "We regret to inform you that we have decided that your job listing is not suitable to share with our members, and have opted not to distribute it.";
const SIGNATURE = "Kind Regards,\nThe HackSoc Team\ninfo@hacksocnotts.co.uk\nhacksocnotts.co.uk";

export const sendApproved = (name: string, email:string) => {
  const to = `${name} <${email}>`;
  const message = `Dear ${name},\n\n${APPROVE_MESSAGE}\n\n${SIGNATURE}`;

  send(FROM, to, APPROVE_SUBJECT, message)
    .catch(console.error);
};

export const sendRejected = (name: string, email:string) => {
  const to = `${name} <${email}>`;
  const message = `Dear ${name},\n\n${REJECT_MESSAGE}\n\n${SIGNATURE}`;

  send(FROM, to, REJECT_SUBJECT, message)
    .catch(console.error);
};
