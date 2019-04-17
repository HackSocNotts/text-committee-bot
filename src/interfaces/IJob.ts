export default interface IJob {
  email: string;
  name: string;
  title?: string;
  company?: string;
  description: string;
  approvalMessage: string;
  approved?: boolean;
  postedMessage?: string;
};
