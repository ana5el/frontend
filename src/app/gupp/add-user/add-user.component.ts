import { ProfileService } from './../../_services/profile.service';
import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/_models/profile';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  constructor(private profileService: ProfileService) {}
  profiles!: Profile[];
  ngOnInit(): void {
    this.profileService.getAll().subscribe(
      (data) => {
        this.profiles = data;
        console.log(this.profiles);
      },
      (error) => console.log(error)
    );
  }

  submitForm() {}
}
