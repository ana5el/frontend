import { Injectable } from '@angular/core';
import { Point } from '../_models/point';
import { Zone } from '../_models/zone';

@Injectable({
  providedIn: 'root',
})
export class MapsService {
  constructor() {}

  findCenter(points: Point[]): Point {
    let x = points.map((p) => p.lat);
    let y = points.map((p) => p.lng);
    let cx = (Math.min(...x) + Math.max(...x)) / 2;
    let cy = (Math.min(...y) + Math.max(...y)) / 2;
    return { lat: cx, lng: cy };
  }

  getPath(zone: Zone): Point[] {
    let result1 = zone.zonePoints?.sort((a, b) => {
      if (a.order > b.order) return -1;
      else if (a.order < b.order) return 1;
      return 0;
    });

    let result2 = result1.map<Point>((zonep) => {
      return { lng: zonep.point.lng, lat: zonep.point.lat };
    });
    console.log(result2);
    return result2;
  }
}
