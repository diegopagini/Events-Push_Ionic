import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { filter, Observable, tap } from 'rxjs';
import { EventDDR } from 'src/app/interfaces/event.ddr';
import { GetFutureEvents } from 'src/app/state/event/events.actions';
import { EventsState } from 'src/app/state/event/events.state';

import { CHIPS } from './chips';
import { IonRefreshEvent } from './ion-refresh-event.interface';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
})
export class EventsListComponent implements OnInit {
  @Select(EventsState.events) events$: Observable<EventDDR[]>;
  @ViewChild('searchbar', { static: false }) searchbar: IonSearchbar;
  events: EventDDR[] = [];
  chips = [...CHIPS];
  typeSearch: string;
  private originalEvents: EventDDR[] = [];

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new GetFutureEvents());
    this.fetchEvents();
  }

  refreshEvents(event: IonRefreshEvent) {
    this.store.dispatch(new GetFutureEvents());
    event.target.complete();
  }

  filterEvents(): void {
    const value = this.searchbar.value || '';

    if (!this.typeSearch) {
      this.events = this.originalEvents.filter((event: EventDDR) =>
        event.title
          .toLowerCase()
          .trim()
          .includes(value?.toLocaleLowerCase().trim())
      );
      return;
    }

    this.events = this.originalEvents.filter(
      (event: EventDDR) =>
        event.type === this.typeSearch &&
        event.title
          .toLowerCase()
          .trim()
          .includes(value?.toLocaleLowerCase().trim())
    );
  }

  filterByType(type: string): void {
    if (this.typeSearch === type) {
      this.typeSearch = '';
      this.events = [...this.originalEvents];
      return;
    }

    this.typeSearch = type;
    this.events = this.originalEvents.filter(
      (event: EventDDR) => event.type.toLowerCase() === type.toLowerCase()
    );
  }

  private fetchEvents(): void {
    this.events$
      .pipe(
        filter(Boolean),
        tap(() => {
          const events = this.store.selectSnapshot(EventsState.events);
          this.events = events;
          this.originalEvents = events;
          this.typeSearch = '';
          if (this.searchbar) this.searchbar.value = '';
        })
      )
      .subscribe();
  }
}
