import { Component } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
})
export class UsersListComponent {
  users!: any[];
  isVisible: boolean = false;

  constructor(private userService: UserService) {}
  ngOnInit() {
    this.userService.getAll().subscribe(
      (data) => {
        this.users = data;
        console.log(this.users);
      },
      (error) => console.log(error)
    );
  }

  downloadPdf(id: number) {
    this.userService.downloadPdf(id);
  }
  deleteUser(id: number) {
    this.userService.delete(id);
    this.users = this.users.filter((user) => user.id != id);
  }

  handleCancel() {}
  createUser() {}
}
