import { Aal } from './aal';
import { Zone } from './zone';
export interface AgentDAutorite {
  id?: number;
  cin: string;
  nom: string;
  prenom: string;
  tel: string;
  grade: any;
  aal: Aal;
  zone: Zone;
}
