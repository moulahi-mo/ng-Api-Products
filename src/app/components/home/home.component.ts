import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from 'src/app/shared/slideInAnimation.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [slideInAnimation],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
