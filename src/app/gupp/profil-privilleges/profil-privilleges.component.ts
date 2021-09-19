import { ProfileService } from './../../_services/profile.service';
import { Component } from '@angular/core';
import { Profile } from 'src/app/_models/profile';
import { PrivilegeService } from 'src/app/_services/privilege.service';
import { Privilege } from 'src/app/_models/privilege';

@Component({
  selector: 'app-profil-privilleges',
  templateUrl: './profil-privilleges.component.html',
})
export class ProfilPrivillegesComponent {
  profiles: Profile[] = [];
  listOfSelectedValue = [];
  privileges: Privilege[] = [];
  listOfSelectedValueCache: { [key: number]: number[] } = {};
  constructor(
    private profileService: ProfileService,
    private privilegeService: PrivilegeService
  ) {
    profileService.getAll().subscribe(
      (data) => {
        this.profiles = data;
        console.log(data);
        this.updateCache();
        console.log(this.listOfSelectedValueCache[1]);
      },
      (error) => console.log(error)
    );

    privilegeService.getAll().subscribe((data) => {
      console.log(data);
      this.privileges = data;
    });
  }

  updateCache(): void {
    this.profiles.forEach((profile) => {
      this.listOfSelectedValueCache[profile.id] = profile.privileges.map(
        (priv) => priv.id
      );
    });
  }

  updateProfile(id: number) {
    this.profileService
      .updatePrivileges(id, this.listOfSelectedValueCache[id])
      .subscribe(
        (data) => console.log('done'),
        (error) => console.log(error)
      );
  }
}
