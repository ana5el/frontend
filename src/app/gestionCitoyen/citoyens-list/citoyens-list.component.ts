import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Citoyen } from 'src/app/_models/citoyen';
import { CitoyenService } from 'src/app/_services/citoyen.service';

interface DataItem {
  name: string;
  age: number;
  address: string;
}
@Component({
  selector: 'app-citoyens-list',
  templateUrl: './citoyens-list.component.html',
  styleUrls: ['./citoyens-list.component.css'],
})
export class CitoyensListComponent {
  searchValue: string = '';
  visible = false;
  listOfData!: Citoyen[];
  listOfDisplayData: Citoyen[] = [];

  constructor(private citoyenservice: CitoyenService) {}

  ngOnInit(): void {
    this.citoyenservice.getAll().subscribe(
      (data) => {
        console.log(data);
        this.listOfData = data;
        this.listOfDisplayData = data;
      },
      (error) => console.log(error)
    );
  }

  reset(): void {
    this.searchValue = '';
    //this.search();
    this.listOfDisplayData = [...this.listOfData];
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter(
      (item) => item.cin == this.searchValue
    );
  }
  export() {
    this.citoyenservice.downloadFile('export.xlsx');
  }
}
