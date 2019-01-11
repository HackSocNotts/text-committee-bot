import channels from '../../database/channels';
import NotFoundError from '../../errors/NotFoundError';

export default async (channel: string): Promise<boolean> => {
  try {
    await channels.get(channel);

    return true;
  } catch (err) {
    if (err instanceof NotFoundError) {
      return false;
    }

    return Promise.reject(err);
  }
};
