export interface message {
  role: role;
  content: string;
}

export enum role {
  user = 'user',
  assistant = 'assistant',
  system = 'system',
}