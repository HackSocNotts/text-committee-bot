import members from './members';

const cron = setInterval(() => {
  // members();
}, 60000);

export default () => {
  clearInterval(cron);
}