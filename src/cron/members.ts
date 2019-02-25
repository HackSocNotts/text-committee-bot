import memberScraper, { UKMSLConfig, UKMSLMember } from 'ukmsl-student-group-member-scraper';
import {
  UKMSL_BASE_URL,
  UKMSL_DOMAIN,
  UKMSL_ASPNET_SESSIONID,
  UKMSL_ASPXAUTH,
  UKMSL_ANTI_XSRF_TOKEN,
  UKMSL_FORM_BODY,
  UKMSL_GROUP_ID
} from '../config';

const config: UKMSLConfig = {
  baseUrl: UKMSL_BASE_URL,
  domain: UKMSL_DOMAIN,
  groupId: UKMSL_GROUP_ID,
  ASPNET_SessionId: UKMSL_ASPNET_SESSIONID,
  ASPXAUTH: UKMSL_ASPXAUTH,
  AntiXsrfToken: UKMSL_ANTI_XSRF_TOKEN,
  formBody: UKMSL_FORM_BODY,
};

export default () => {
  memberScraper(config)
    .then((members: UKMSLMember[]) => {
      console.log(members, `${members.length} found`);
    })
    .catch(err => console.error("Error fetching members", err));
}
