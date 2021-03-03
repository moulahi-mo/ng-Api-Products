import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/interfaces';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  user: User;
  isError: string = null;
  isLoading: boolean = false;
  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.fetchProduct(id);
  }

  public fetchProduct(id: string) {
    this.isLoading = true;
    this.usersService.getUserById(id).subscribe(
      (data) => {
        console.log(data);
        this.user = data;
        this.isLoading = false;
      },
      (err) => (this.isError = err)
    );
  }
}
