import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-edit-events',
  templateUrl: './add-edit-events.component.html',
  styleUrls: ['./add-edit-events.component.scss'],
})
export class AddEditEventsComponent implements OnInit {
  showEnd = false;

  constructor() {}

  ngOnInit(): void {}

  addEditEvent(): void {}

  changeShowEnd(): void {
    this.showEnd = !this.showEnd;
  }
}
