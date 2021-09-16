import { Component } from '@angular/core';
import { Point } from '../_models/point';

@Component({
  selector: 'app-gupp',
  templateUrl: './gupp.component.html',
})
export class GuppComponent {
  isVisible: boolean = false;
  tabs = [1, 2, 3];

  handleCancel() {
    this.isVisible = false;
  }
}
