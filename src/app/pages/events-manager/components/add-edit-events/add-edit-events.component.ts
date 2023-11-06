import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import * as moment from 'moment';
import { catchError, tap, throwError } from 'rxjs';
import { EventDDR } from 'src/app/interfaces/event.ddr';
import { ToastService } from 'src/app/services/toast.service';
import {
  CreateEvent,
  GetFutureEvents,
  UpdateEvent,
} from 'src/app/state/event/events.actions';
import { EventsState } from 'src/app/state/event/events.state';

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

  constructor(
    private fb: FormBuilder,
    private navController: NavController,
    private navParams: NavParams,
    private store: Store,
    private toastService: ToastService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.initEvents();
  }

  addEditEvent(): void {
    if (this.eventForm.valid) {
      this.event = this.eventForm.value;
      if (!this.showEnd) this.event.end = '';

      if (this.edit) {
        this.store
          .dispatch(new UpdateEvent(this.eventForm.value))
          .pipe(
            catchError((error) => {
              this.toastService.showToast(
                this.translateService.instant('label.edit.event.error')
              );

              return throwError(() => error);
            }),
            tap(() => {
              const success = this.store.selectSnapshot(EventsState.success);
              if (success) {
                this.toastService.showToast(
                  this.translateService.instant('label.edit.event.success')
                );

                this.store.dispatch(new GetFutureEvents());
                this.navController.navigateForward('events');
              } else
                this.toastService.showToast(
                  this.translateService.instant('label.edit.event.error')
                );
            })
          )
          .subscribe();
      } else {
        this.store
          .dispatch(new CreateEvent(this.event))
          .pipe(
            catchError((error) => {
              this.toastService.showToast(
                this.translateService.instant('label.add.event.error')
              );

              return throwError(() => error);
            }),
            tap(() => {
              const success = this.store.selectSnapshot(EventsState.success);
              if (success) {
                this.toastService.showToast(
                  this.translateService.instant('label.add.event.success')
                );

                this.newEvent();

                this.store.dispatch(new GetFutureEvents());
                this.navController.navigateForward(['events']);
              } else {
                this.toastService.showToast(
                  this.translateService.instant('label.add.event.error')
                );
              }
            })
          )
          .subscribe();
      }
    }
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
      id: null,
      description: null,
      end: moment().format('YYYY-MM-DDTHH:mm'),
      start: moment().format('YYYY-MM-DDTHH:mm'),
      title: null,
      type: 'blog',
      url: null,
    });
  }

  initEvents(): void {
    this.loadEventToEdit();

    if (!this.event) {
      this.edit = false;
      this.showEnd = false;
    } else {
      this.edit = true;
      this.showEnd = this.event.end !== null;
    }

    this.minDate = moment().format('YYYY-MM-DDTHH:mm');

    this.eventForm = this.fb.group({
      id: [this.event?.id || null],
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

  private loadEventToEdit(): void {
    this.event = this.navParams.data['event'];
  }
}
