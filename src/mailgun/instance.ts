import mailgunJs from 'mailgun-js';
import { MAILGUN_API, MAILGUN_DOMAIN } from '../config';

const mailgun = new mailgunJs({
  apiKey: MAILGUN_API,
  domain: MAILGUN_DOMAIN,
});

export default mailgun;
