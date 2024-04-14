import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
})
export class AnalyticsComponent {
  users: User[] = [];

  //will create a table with the created users  // user: User = {
  //   firstName: '',
  //   lastName: '',
  //   gender: '',
  //   email: '',
  //   birthday: '',
  //   address: '',
  //   city: '',
  //   country: '',
  //   hobbies: [],
  //   favoriteColor: this.defaultColor,
  //   seats: '',
  //   motorType: '',
  // };
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'gender',
    'email',
    'birthday',
    'address',
    'city',
    'country',
    'hobbies',
    'favoriteColor',
    'seats',
    'motorType',
  ];
  dataSource = new MatTableDataSource<User>(this.users);

  constructor(private userService: UserService) {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      this.dataSource = new MatTableDataSource<User>(this.users);
    });
  }

  // ngOnInit() {
  //   this.userService.getUsers().subscribe((users) => {
  //     this.users = users;
  //     this.dataSource = new MatTableDataSource<User>(this.users);
  //   });
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // ngOnInit() {
}
