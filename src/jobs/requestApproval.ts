import { Client, TextChannel, Message, RichEmbed } from 'discord.js';
import { JOB_APPROVAL_CHANNEL_ID } from '../config';
import IJob from '../interfaces/IJob';

const requestApproval = async (client: Client, job: IJob, timestamp: String): Promise<[Message, RichEmbed]> => {
  const approvalChannel = client.channels.get(JOB_APPROVAL_CHANNEL_ID) as TextChannel;

  const submitterString = (job.company) ? (job.title) ? `\n${job.title} at ${job.company}` : `\nFrom ${job.company}` : '';

  const embed = new RichEmbed({
    title: `New Job Posting`,
    description: "Select 👍 to approve the job listing, 👎 to deny it, or 🚫 to block the submitter.",
    footer: {
      text: `${job.email} | ${timestamp}`,
    },
  });

  embed.addField("Submitter", `${job.name}${submitterString}`);
  embed.addField("Job Description", job.description);

  const message = (await approvalChannel.send(embed)) as Message;
  await message.react('👍'); await message.react('👎'); await message.react('🚫');

  return [message, embed];
}

export default requestApproval;