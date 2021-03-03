import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/interfaces';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  constructor(private serviceUsers: UsersService) {}

  isError: string = null;
  isLoading: boolean = false;
  users: User[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['name', 'email', 'role', 'createdAt', 'action'];

  ngOnInit(): void {
    this.fetchAllUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public fetchAllUsers() {
    this.isLoading = true;
    this.serviceUsers.GetAllUsers().subscribe(
      (data: any) => {
        console.log(data.data);
        this.dataSource.data = data.data;
        this.users = data.data;
        this.isLoading = false;
      },
      (err) => (this.isError = err)
    );
  }

  public onFilter(term: string) {
    console.log(term);
    this.dataSource.filter = term;
  }
}
