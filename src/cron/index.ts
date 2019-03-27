import members from './members';

members();

const cron = setInterval(() => {
  members();
}, 60000);

export default () => {
  clearInterval(cron);
}