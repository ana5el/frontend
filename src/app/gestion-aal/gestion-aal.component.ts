import { MapsService } from './../_services/maps.service';
import { Point } from './../_models/point';
import { Aal } from 'src/app/_models/aal';
import { AalService } from './../_services/aal.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Zone } from '../_models/zone';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gestion-aal',
  templateUrl: './gestion-aal.component.html',
  styleUrls: ['./gestion-aal.component.css'],
})
export class GestionAalComponent implements OnInit {
  aals!: Aal[];
  filteredAals!: Aal[];
  isLoaded = false;
  infoWindowIsOpen = false;
  points: Point[] = [];

  options = [
    { name: 'Préfecture', value: 'Préfecture', checked: false },
    { name: 'District', value: 'District', checked: false },
    { name: 'Cercle', value: 'Cercle', checked: false },
    {
      name: 'Annexe Administrative',
      value: 'Annexe Administrative',
      checked: true,
    },
    { name: 'Caidat', value: 'caidat', checked: false },
  ];

  constructor(
    private mapsService: MapsService,
    private aalService: AalService,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) {
    aalService.getAll().subscribe(
      (data) => {
        this.aals = data.map((elt) => {
          elt.zone.path = this.getPath(elt.zone);
          return elt;
        });
        this.filteredAals = this.aals;
        this.isLoaded = true;
      },
      (error) => console.log(error)
    );
  }

  ngOnInit(): void {}

  onMapReady(map: google.maps.Map) {
    map.setOptions({
      styles: <google.maps.MapTypeStyle[]>environment.mapStyle,
      center: { lat: 30.419359848186662, lng: -9.56158841247559 },
      zoom: 12,
    });

    const controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginTop = '8px';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to recenter the map';
    controlUI.style.padding = '5px';

    this.options.forEach((option) => {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = option.value;
      checkbox.id = option.name;
      checkbox.checked = option.checked;
      checkbox.addEventListener('change', (event: any) => {
        if (event.currentTarget.checked) {
          option.checked = true;
          this.onFilter();
        } else {
          option.checked = false;
          this.onFilter();
        }
      });

      const label = document.createElement('label');
      label.style.fontSize = '16px';
      label.style.paddingLeft = '5px';
      label.style.paddingRight = '15px';
      label.style.color = 'rgb(25,25,25)';
      label.style.fontFamily = 'Roboto,Arial,sans-serif';
      label.htmlFor = option.name;
      label.appendChild(document.createTextNode(option.value));
      controlUI.appendChild(checkbox);
      controlUI.appendChild(label);
    });

    map.controls[google.maps.ControlPosition.TOP_CENTER].push(controlUI);
    this.onFilter();
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
    return result2;
  }

  getCenter(points: Point[]): Point {
    return this.mapsService.findCenter(points);
  }

  deleteAal(id: number) {
    this.filteredAals = this.filteredAals.filter((aal) => aal.id !== id);
    this.aals = this.aals.filter((aal) => aal.id !== id);
  }

  onFilter() {
    let filtred = this.aals.filter((aal) => {
      return this.options
        .filter((opt) => opt.checked)
        .map((opt) => opt.name)
        .find((name) => name === aal.typeAAL.labelFr);
    });
    this.filteredAals = filtred;
  }
}
