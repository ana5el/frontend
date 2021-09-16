import { PointXY } from './point-xy';
export class GrahmanScan {
  points: PointXY[] = [];
  anchorPoint!: PointXY;
  constructor() {}

  addPoint(x: number, y: number) {
    let newAnchor =
      this.anchorPoint === undefined ||
      (this.anchorPoint, y > y) ||
      (this.anchorPoint.y === y && this.anchorPoint.x > x);
    if (newAnchor) {
      if (this.anchorPoint !== undefined) {
        this.points.push({ x: this.anchorPoint.x, y: this.anchorPoint.y });
      }
      this.anchorPoint = { x: x, y: y };
    } else {
      this.points.push({ x: x, y: y });
    }
  }

  _addPoint = (x: number, y: number) => {
    let newAnchor: boolean =
      this.anchorPoint === undefined ||
      this.anchorPoint.y > y ||
      (this.anchorPoint.y === y && this.anchorPoint.x > x);

    if (newAnchor) {
      if (this.anchorPoint !== undefined) {
        this.points.push({ x: this.anchorPoint.x, y: this.anchorPoint.y });
      }
      this.anchorPoint = { x: x, y: y };
    } else {
      this.points.push({ x: x, y: y });
    }
  };
}
