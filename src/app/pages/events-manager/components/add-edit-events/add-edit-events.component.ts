import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { EventDDR } from 'src/app/interfaces/event.ddr';

@Component({
  selector: 'app-add-edit-events',
  templateUrl: './add-edit-events.component.html',
  styleUrls: ['./add-edit-events.component.scss'],
})
export class AddEditEventsComponent implements OnInit {
  edit = false;
  event: EventDDR;
  eventForm: FormGroup;
  showEnd = false;
  minDate: string;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initEvents();
  }

  addEditEvent(): void {
    console.log(this.eventForm.value);
  }

  changeShowEnd(): void {
    this.showEnd = !this.showEnd;

    if (!this.showEnd)
      this.eventForm.patchValue({
        end: moment().format('YYYY-MM-DDTHH:mm'),
      });
    else
      this.eventForm.patchValue({
        end: null,
      });
  }

  newEvent(): void {
    this.edit = false;
    this.showEnd = false;
    this.event = null as any;

    this.eventForm.patchValue({
      description: null,
      end: moment().format('YYYY-MM-DDTHH:mm'),
      start: moment().format('YYYY-MM-DDTHH:mm'),
      title: null,
      type: 'blog',
      url: null,
    });
  }

  private initEvents(): void {
    if (!this.event) {
      this.edit = false;
      this.showEnd = false;
    } else {
      this.edit = true;
      this.showEnd = this.event.end !== null;
    }

    this.minDate = moment().format('YYYY-MM-DDTHH:mm');

    this.eventForm = this.fb.group({
      description: [this.event?.description || null, [Validators.required]],
      end: [this.event?.end || moment().format('YYYY-MM-DDTHH:mm')],
      start: [
        this.event?.start || moment().format('YYYY-MM-DDTHH:mm'),
        [Validators.required],
      ],
      title: [this.event?.title || null, [Validators.required]],
      type: [this.event?.type || 'blog', [Validators.required]],
      url: [
        this.event?.url || null,
        [
          Validators.required,
          Validators.pattern(
            '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
          ),
        ],
      ],
    });
  }
}
