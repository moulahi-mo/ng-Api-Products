import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  @Output() filtre: EventEmitter<string> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  public onFilter(term: string) {
    this.filtre.emit(term.trim().toLowerCase());
  }
}
