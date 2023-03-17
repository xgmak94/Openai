export interface message {
  role: role;
  content: string;
  ai: string;
}

export enum role {
  user = 'user',
  assistant = 'assistant',
  system = 'system',
}