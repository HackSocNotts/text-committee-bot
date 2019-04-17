import * as mailgunFactory from 'mailgun-js';
import { MAILGUN_API, MAILGUN_DOMAIN } from '../config';

const mailgun = new mailgunFactory({
  apiKey: MAILGUN_API,
  domain: MAILGUN_DOMAIN,
});

export default mailgun;
