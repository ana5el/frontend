import { Point } from './point';
import { ZonePoint } from './zone-point';
import { Logement } from './logement';
export interface Zone {
  id?: number;
  zonePoints: ZonePoint[];
  path: Point[];
  logements: Logement[];
  style : string

}
