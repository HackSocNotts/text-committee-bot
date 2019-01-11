import Nexmo = require('nexmo');
import { NEXMO_API, NEXMO_SECRET, NEXMO_APPLICATION } from '../config';

const nexmo = new Nexmo({
  apiKey: NEXMO_API,
  apiSecret: NEXMO_SECRET,
  applicationId: NEXMO_APPLICATION,
});

export default nexmo;
