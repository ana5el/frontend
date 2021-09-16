import { TypeLogement } from './../_models/type-logement';
import { LogementService } from './../_services/logement.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-adr',
  templateUrl: './gestion-adr.component.html',
  styleUrls: ['./gestion-adr.component.css'],
})
export class GestionAdrComponent implements OnInit {
  lat = 30.4198163;
  lng = -9.6127641;
  drawingManager!: google.maps.drawing.DrawingManager;
  pointList: { lat: number; lng: number }[] = [];
  selectedShape: any;
  selectedArea = 0;
  info: string = '';
  rue: string = '';
  typeLogementList!: TypeLogement[];
  selectedType!: TypeLogement;
  constructor(private logementService: LogementService) {}

  ngOnInit(): void {
    this.setCurrentLocation();
    this.logementService.getTypes().subscribe(
      (data) => (this.typeLogementList = data),
      (error) => console.log(error)
    );
  }

  onMapReady(map: google.maps.Map) {
    map.setOptions({
      zoom: 12,
    });
    this.initDrawingManager(map);
  }

  save() {
    this.logementService
      .create({
        info: this.info,
        rue: this.rue,
        superficie: this.selectedArea,
        points: this.pointList,
      })
      .subscribe(
        (data) => {
          // todo create alerter
          console.log('SUCCESS');
        },
        (error) => {
          // todo create alerter
          console.log(error);
        }
      );
  }

  deleteSelectedShape() {
    if (this.selectedShape) {
      this.selectedShape.setMap(null);
      this.selectedArea = 0;
      this.pointList = [];
      // To show:
      this.drawingManager.setOptions({
        drawingControl: true,
      });
    }
  }

  updatePointList(path: any) {
    this.pointList = [];
    const len = path.getLength();
    for (let i = 0; i < len; i++) {
      this.pointList.push(path.getAt(i).toJSON());
    }
    this.selectedArea = google.maps.geometry.spherical.computeArea(path);
  }
  setCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }

  initDrawingManager = (map: google.maps.Map) => {
    const self = this;
    const clearbtn = document.createElement('button');
    clearbtn.textContent = 'Clear';
    clearbtn.style.cssText = `background-color: #fff;border: 0;border-radius: 2px;box-shadow: 0 1px 4px -1px rgba(0, 0, 0, 0.3);margin: 10px;padding: 0 0.5em;font: 400 18px Roboto, Arial, sans-serif;overflow: hidden;cursor: pointer;`;
    clearbtn.classList.add('custom-map-control-button');
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(clearbtn);

    // clear btn listener
    clearbtn.addEventListener('click', () => {
      this.deleteSelectedShape();
    });

    this.drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.MARKER,
          google.maps.drawing.OverlayType.POLYGON,
        ],
      },
      polygonOptions: {
        fillColor: '#FFFF00',
        fillOpacity: 0.3,
        strokeOpacity: 0,
        clickable: true,
        editable: true,
        zIndex: 1,
      },
    });
    this.drawingManager.setMap(map);
    google.maps.event.addListener(
      this.drawingManager,
      'overlaycomplete',
      (event) => {
        if (event.type === google.maps.drawing.OverlayType.POLYGON) {
          const paths = event.overlay.getPaths();
          for (let p = 0; p < paths.getLength(); p++) {
            google.maps.event.addListener(paths.getAt(p), 'set_at', () => {
              if (!event.overlay.drag) {
                self.updatePointList(event.overlay.getPath());
              }
            });
            google.maps.event.addListener(paths.getAt(p), 'insert_at', () => {
              self.updatePointList(event.overlay.getPath());
            });
            google.maps.event.addListener(paths.getAt(p), 'remove_at', () => {
              self.updatePointList(event.overlay.getPath());
            });
          }
          self.updatePointList(event.overlay.getPath());
          this.selectedShape = event.overlay;
          this.selectedShape.type = event.type;
        }
        if (event.type !== google.maps.drawing.OverlayType.MARKER) {
          self.drawingManager.setDrawingMode(null);
          self.drawingManager.setOptions({
            drawingControl: false,
          });
        }
      }
    );
  };
}
