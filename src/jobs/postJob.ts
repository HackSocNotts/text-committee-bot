import IJob from "../interfaces/IJob";
import { Client, Message, TextChannel, RichEmbed } from 'discord.js';
import { JOB_CHANNEL_ID } from '../config';

const postJob = async (job: IJob, client: Client): Promise<Message> => {
  const channel = client.channels.get(JOB_CHANNEL_ID) as TextChannel;

  try {
    const submitterString = (job.company) ? (job.title) ? ` | ${job.title} at ${job.company}` : ` from ${job.company}` : '';

    const embed = new RichEmbed({
      title: `Job Posting by ${job.name}${submitterString}`,
      description: job.description,
      footer: {
        text: `Contact ${job.name} at ${job.email} to inquire further.`,
      },
    });

    return channel.send(embed) as Promise<Message>;
  } catch (err) {
    throw new Error(err);
  }
}

export default postJob;