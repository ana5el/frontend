import { AgentDAutorite } from './agent-dautorite';
export class User {
  token?: string;
  type: string = '';
  username: string = '';
  authorities: string[] = [];
  authenticated: boolean = false;
}
