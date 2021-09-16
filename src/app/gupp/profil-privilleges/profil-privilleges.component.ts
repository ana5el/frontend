import { ProfileService } from './../../_services/profile.service';
import { Component } from '@angular/core';
import { Profile } from 'src/app/_models/profile';

@Component({
  selector: 'app-profil-privilleges',
  templateUrl: './profil-privilleges.component.html',
})
export class ProfilPrivillegesComponent {
  constructor(private profileService: ProfileService) {
    profileService.getAll().subscribe(
      (data) => {
        this.listOfData = data;
        console.log(data);
      },
      (error) => console.log(error)
    );
  }
  listOfData: Profile[] = [];
}
