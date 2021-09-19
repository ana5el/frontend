import { Aal } from './aal';
import { Grade } from './grade';
import { Zone } from './zone';
export interface AgentDAutorite {
  id?: number;
  cin: string;
  nom: string;
  prenom: string;
  tel: string;
  grade: Grade;
  aal: Aal;
  zone: Zone;
}
