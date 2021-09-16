import { AgentDAutorite } from './agent-dautorite';
import { Profile } from './profile';
export interface UserAa {
  id?: number;
  username: string;
  prfile: Profile;
  agentAutorite: AgentDAutorite;
}
