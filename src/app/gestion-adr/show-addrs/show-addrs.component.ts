import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from './../../_services/user.service';
import { AuthenticationService } from './../../_services/authentication.service';
import { MapsService } from './../../_services/maps.service';
import { LogementService } from './../../_services/logement.service';
import { Point } from './../../_models/point';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Zone } from 'src/app/_models/zone';
import { TypeLogement } from 'src/app/_models/type-logement';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-show-addrs',
  templateUrl: './show-addrs.component.html',
  styleUrls: ['./show-addrs.component.css'],
})
export class ShowAddrsComponent implements OnInit {
  lat = 30.4198163;
  lng = -9.6127641;
  isOpen = false;
  dataLoaded1 = false;
  dataLoaded2 = false;
  center!: Point;
  types!: TypeLogement[];
  logementsZones!: Zone[];
  userLimitZone!: Zone;
  maisonsLoaded = false;
  villasLoaded = false;
  immeublesLoaded = false;

  @Input() addr: string = '';
  @Output() addrChange = new EventEmitter<string>();

  maisons!: any[];
  villas!: any[];
  immeubles!: any[];

  drawingManager!: google.maps.drawing.DrawingManager;

  constructor(
    private mapsService: MapsService,
    private logementService: LogementService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.setCurrentLocation();

    this.logementService.getImmeubles().subscribe(
      (data) => {
        this.immeubles = data.map((imm: any) => {
          imm.path = this.mapsService.getPath(imm.zone);
          imm.appts = [];
          for (let i = 0; i < imm.nbAppts; i++) {
            imm.appts.push(i);
          }
          return imm;
        });
        this.immeublesLoaded = true;
        console.log(this.immeubles);
      },
      (error) => {
        this.message.create('error', 'Error Loading Data (IMMS)');
      }
    );

    this.logementService.getMaisons().subscribe(
      (data) => {
        //console.log(data);
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

    this.userService
      .getByUsername(this.authenticationService.userValue!.username)
      .subscribe(
        (user) => {
          this.userLimitZone = {
            ...user.agentAutorite.zone,
            path: this.mapsService.getPath(user.agentAutorite.zone),
          };
          this.dataLoaded2 = true;
          console.log(this.userLimitZone);
        },
        (error) => console.log(error)
      );
  }

  onMapReady(map: google.maps.Map) {
    map.setOptions({
      center: {
        lat: this.getCenter(this.userLimitZone.path).lat,
        lng: this.getCenter(this.userLimitZone.path).lng,
      },
      zoom: 15,
      styles: <google.maps.MapTypeStyle[]>environment.mapStyle,
    });

    const polyline = new google.maps.Polyline({
      path: this.userLimitZone.path,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1,
      map: map,
    });
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

  getApptAdresse(numeroAppt: number, immeuble: any) {
    this.addrChange.emit(
      `Appt ${numeroAppt} Immeuble ${immeuble.nomFr} Rue ${immeuble.rue} Quartier ${immeuble.quartier}`
    );
  }

  getMaisonAdresse(maison: any) {
    this.addrChange.emit(
      `Maison N° ${maison.numero} rue ${maison.rue} quartier ${maison.quartier}`
    );
  }

  getVillaAdresse(villa: any) {
    this.addrChange.emit(
      `Villa N° ${villa.numero} rue ${villa.rue} quartier ${villa.quartier}`
    );
  }
}
