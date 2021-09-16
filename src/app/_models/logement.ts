import { Zone } from './zone';

export interface Logement {
  id?: number;
  info: string;
  rue: string;
  superficie: number;
  quartier: any;
  zone: Zone;
}
