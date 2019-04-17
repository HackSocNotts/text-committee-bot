export default interface IRawJob {
  id: string;
  submitterEmail: string;
  submitterName: string;
  submitterTitle?: string;
  submitterCompany?: string;
  description: string;
  approvalMessage: string;
  approved?: boolean;
  postedMessage?: string;
};
