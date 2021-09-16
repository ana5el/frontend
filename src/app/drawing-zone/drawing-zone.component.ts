import { map } from 'rxjs/operators';
import { UserService } from './../_services/user.service';
import { AuthenticationService } from './../_services/authentication.service';
import { ZoneService } from './../_services/zone.service';
import { MapsService } from './../_services/maps.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TypeLogement } from './../_models/type-logement';
import { LogementService } from './../_services/logement.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Point } from '../_models/point';
import { environment } from 'src/environments/environment';
import { Zone } from '../_models/zone';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-drawing-zone',
  templateUrl: './drawing-zone.component.html',
  styleUrls: ['./drawing-zone.component.css'],
})
export class DrawingZoneComponent implements OnInit {
  lat = 30.4198163;
  lng = -9.6127641;
  isOpen = false;
  isLoaded = false;
  dataLoaded2 = false;
  center!: Point;
  types!: TypeLogement[];

  immeubles!: any[];
  immeublesLoaded = false;
  villas!: any[];
  villasLoaded = false;
  maisons!: any[];
  maisonsLoaded = false;

  userLimitZone!: Zone;

  drawingManager!: google.maps.drawing.DrawingManager;
  @Input() pointList: Point[] = [];
  @Output() pointListChange = new EventEmitter<Point[]>();

  form = new FormGroup({
    type: new FormControl('maison', Validators.required),
    rue: new FormControl('', Validators.required),
    quartier: new FormControl('', Validators.required),
    numero: new FormControl(null),
    nbAppts: new FormControl(null),
    nomAr: new FormControl(''),
    nomFr: new FormControl(''),
    superficie: new FormControl(null),
  });

  selectedShape: any;

  constructor(
    private logementService: LogementService,
    private mapsService: MapsService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.setCurrentLocation();
    this.logementService.getTypes().subscribe(
      (data) => {
        this.types = data;
      },
      (error) => {
        console.log(error);
      }
    );

    this.logementService.getImmeubles().subscribe(
      (data) => {
        this.immeubles = data.map((imm: any) => {
          imm.path = this.mapsService.getPath(imm.zone);
          return imm;
        });
        this.immeublesLoaded = true;
      },
      (error) => {
        this.message.create('error', 'Error Loading Data (IMMS)');
      }
    );

    this.logementService.getMaisons().subscribe(
      (data) => {
        this.maisons = data.map((m: any) => {
          m.path = this.mapsService.getPath(m.zone);
          return m;
        });
        this.maisonsLoaded = true;
      },
      (error) => {
        this.message.create('error', 'Error Loading Data (MS)');
      }
    );
    this.logementService.getVillas().subscribe(
      (data) => {
        this.villas = data.map((v: any) => {
          v.path = this.mapsService.getPath(v.zone);
          return v;
        });
        this.villasLoaded = true;
      },
      (error) => {
        this.message.create('error', 'Error Loading Data (VS)');
      }
    );

    // this.zoneService.getAll().subscribe(
    //   (zones) => {
    //     this.logementsZones = zones
    //       .filter((zone) => zone.logements.length)
    //       .map((z) => {
    //         z.path = this.mapsService.getPath(z);
    //         return z;
    //       });
    //     this.dataLoaded1 = true;
    //   },
    //   (error) => console.log(error)
    // );
    this.userService
      .getByUsername(this.authenticationService.userValue!.username)
      .subscribe(
        (user) => {
          this.userLimitZone = {
            ...user.agentAutorite.zone,
            path: this.mapsService.getPath(user.agentAutorite.zone),
          };
          this.dataLoaded2 = true;
          //console.log(this.userLimitZone);
        },
        (error) => console.log(error)
      );
  }

  // TO CHANGE
  onFormSubmit() {
    this.logementService
      .create({
        type: this.form.get('type')?.value,
        rue: this.form.get('rue')?.value,
        quartier: this.form.get('quartier')?.value,
        superficie: this.form.get('superficie')?.value,
        numero: this.form.get('numero')?.value,
        nbAppts: this.form.get('nbAppts')?.value,
        nomAr: this.form.get('nomAr')?.value,
        nomFr: this.form.get('nomFr')?.value,
        points: this.pointList,
      })
      .subscribe(
        (data) => {
          this.message.create('success', "L'adresse a été ajouté avec success");
          this.deleteSelectedShape();
        },
        (error) => {
          this.message.create('error', 'Internal Server Error !!');
          this.deleteSelectedShape();
        }
      );
  }
  onMapReady(map: google.maps.Map) {
    map.setOptions({
      zoom: 12,
      styles: <google.maps.MapTypeStyle[]>environment.mapStyle,
    });

    const polyline = new google.maps.Polyline({
      path: this.userLimitZone.path,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 0.7,
      strokeWeight: 2,
      map: map,
    });
    this.initDrawingManager(map);
  }

  deleteSelectedShape() {
    if (this.selectedShape) {
      this.selectedShape.setMap(null);
      this.form.get('superficie')?.setValue(0);
      this.pointList = [];
      this.drawingManager.setOptions({
        drawingControl: true,
      });
      this.form.reset();
      this.isOpen = false;
      this.pointListChange.emit(this.pointList);
    }
  }

  updatePointList(path: any) {
    this.pointList = [];
    const len = path.getLength();
    for (let i = 0; i < len; i++) {
      this.pointList.push(path.getAt(i).toJSON());
    }
    this.form
      .get('superficie')
      ?.setValue(google.maps.geometry.spherical.computeArea(path));
    this.pointListChange.emit(this.pointList);
  }
  setCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }

  getCenter(points: Point[]): Point {
    return this.mapsService.findCenter(points);
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
        drawingModes: [google.maps.drawing.OverlayType.POLYGON],
      },
      polygonOptions: {
        fillColor: '#05153C',
        fillOpacity: 0.8,
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
          this.selectedShape.addListener('click', () => {
            this.isOpen = true;
          });
          this.center = this.mapsService.findCenter(this.pointList);
          this.isLoaded = true;
          //this.isOpen = true;
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
