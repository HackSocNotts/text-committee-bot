import { Message } from 'discord.js';
import { GUILD_ID, MEMBER_ROLE_ID } from '../../config';
import suMembers from '../../database/suMembers';
import NotFoundError from '../../errors/NotFoundError';

/**
 * @copyright 2019 HackSoc Nottingham
 * @author Aaron Osher <aaron@osher.dev>
 * Not to be used in the standard function handler as this
 * is exclusive to role assignments from the general bot
 */

const handleDM = async (msg: Message) =>  {
  const guild = msg.client.guilds.get(GUILD_ID);
  const user = msg.author;

  const idNumberExpression = /[1,2][0,4,8,2][\d]{6}/;
  const idNumber = msg.content.substring(0, 8);

  if (!idNumberExpression.test(idNumber)) {
    return msg.reply("That doesn't appear to be a valid University of Nottingham Student ID Number. Please send a valid ID number.");
  }

  if (!guild.available) {
    console.error("Server seems to be down.")

    return msg.reply('The HackSoc Discrod Server seems to be unavailable, please try again later.');
  }

  try {
    const member = await guild.fetchMember(user);
    const suMember = await suMembers.get(parseInt(idNumber, 10));

    if (!!suMember.discordId) {
      return msg.reply("It appears that your ID has already been claimed for permissions. Please speak to a memeber of committee for roles.");
    }

    return member.addRole(MEMBER_ROLE_ID)
      .then(() => suMembers.addDiscord(parseInt(idNumber, 10), member.id))
      .then(() => msg.reply("Thanks for your ID Number. I've verified your membership and assigned your member role. You should now have access to all member channels. Please remember to abide by the Code of Conduct."))
      .catch((err: Error) => {
        console.error(err);
        
        return msg.reply("An error occured. Please try again later or contact a committee member.")
      });
    
  } catch (err) {
    if (err instanceof NotFoundError) {
      return msg.reply("I couldn't find your ID Number. Please verify it's correct and that you hold a HackSoc membership. It can take up to five minutes for me to see a newly purchased membership.");
    }

    console.error(err);

    return msg.reply("An error occured. Please try again later or contact a committee member.");
  } 
};

export default handleDM;
