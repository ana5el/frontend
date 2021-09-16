import { Privilege } from './privilege';
export interface Profile {
  id: number;
  name: string;
  labelAr: string;
  labelFr: string;
  privileges: Privilege[];
}
