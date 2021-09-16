import { TypeAal } from './type-aal';
import { Zone } from './zone';
export interface Aal {
  id: number;
  labelAr: string;
  labelFr: string;
  tel: String;
  typeAAL: TypeAal;
  aal: Aal | null;
  zone: Zone;
}
