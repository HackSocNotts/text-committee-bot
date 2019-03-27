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
import IMember from '../interfaces/IMember';
import Members from '../database/suMembers';

const config: UKMSLConfig = {
  baseUrl: UKMSL_BASE_URL,
  domain: UKMSL_DOMAIN,
  groupId: UKMSL_GROUP_ID,
  ASPNET_SessionId: UKMSL_ASPNET_SESSIONID,
  ASPXAUTH: UKMSL_ASPXAUTH,
  AntiXsrfToken: UKMSL_ANTI_XSRF_TOKEN,
  formBody: UKMSL_FORM_BODY,
};

const added: number[] = [];

export default () => {
  memberScraper(config)
    .then((ukmslMembers: UKMSLMember[]) => {

      console.debug(`${ukmslMembers.length} UKMSL members retrieved`);
      
      const members: IMember[] = ukmslMembers
        .filter((member: UKMSLMember) => member.id !== '')
        .map((member: UKMSLMember) => ({
        id: parseInt(member.id, 10),
        name: member.name
      }));

      console.debug(`Updating ${members.length} member entries`);
      
      for (const member of members) {
        if (!added.includes(member.id)) {
          Members.add(member) 
            .then(() => added.push(member.id))
            .catch((err: Error) => console.error("Failed to add member", member, err));
        }
      }
    })
    .catch((err: Error) => console.error("Error fetching members", err));
}
