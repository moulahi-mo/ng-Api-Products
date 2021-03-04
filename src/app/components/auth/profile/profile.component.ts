import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User;
  isError: string = null;
  isLoading: boolean = false;
  constructor(private usersService: AuthService) {}

  ngOnInit(): void {
    this.fetchuser();
  }

  public fetchuser() {
    this.isLoading = true;
    this.usersService.getCurrentUser().subscribe(
      (data: any) => {
        console.log(data);
        this.user = data.userInfos;
        this.isLoading = false;
      },
      (err) => (this.isError = err)
    );
  }
}
