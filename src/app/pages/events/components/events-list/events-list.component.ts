import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { filter, Observable, tap } from 'rxjs';
import { EventDDR } from 'src/app/interfaces/event.ddr';
import { GetFutureEvents } from 'src/app/state/event/events.actions';
import { EventsState } from 'src/app/state/event/events.state';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
})
export class EventsListComponent implements OnInit {
  @Select(EventsState.events) events$: Observable<EventDDR[]>;
  events: EventDDR[] = [];

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new GetFutureEvents());
    this.fetchEvents();
  }

  private fetchEvents(): void {
    this.events$
      .pipe(
        filter(Boolean),
        tap(() => {
          const events = this.store.selectSnapshot(EventsState.events);
          this.events = events;
        })
      )
      .subscribe();
  }
}
