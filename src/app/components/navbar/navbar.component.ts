import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Output() onMenu: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  public onMenuClicked() {
    this.onMenu.emit();
  }
}
