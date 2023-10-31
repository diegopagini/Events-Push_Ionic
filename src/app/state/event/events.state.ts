import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { EventDDR } from 'src/app/interfaces/event.ddr';

import { CreateEvent, DeleteEvent, UpdateEvent } from './events.actions';
import { EventsService } from './events.service';

export class EventsStateModel {
  events: EventDDR[];
  success: boolean;
}

const defaults = {
  events: [],
  success: false,
};

@State<EventsStateModel>({
  name: 'events',
  defaults,
})
@Injectable()
export class EventsState {
  constructor(private eventsService: EventsService) {}

  @Selector()
  static success(state: EventsStateModel): boolean {
    return state.success;
  }

  @Selector()
  static events(state: EventsStateModel): EventDDR[] {
    return state.events;
  }

  @Action(CreateEvent)
  createEvent(
    { patchState }: StateContext<EventsStateModel>,
    { payload }: CreateEvent
  ) {
    return this.eventsService
      .createEvent(payload)
      .then((success: boolean) => {
        patchState({
          success,
        });
      })
      .catch(() => {
        patchState({
          success: false,
        });
      });
  }

  @Action(UpdateEvent)
  updateEvent(
    { patchState }: StateContext<EventsStateModel>,
    { payload }: UpdateEvent
  ) {
    return this.eventsService
      .updateEvent(payload)
      .then((success: boolean) => {
        patchState({
          success,
        });
      })
      .catch(() => {
        patchState({
          success: false,
        });
      });
  }

  @Action(DeleteEvent)
  deleteEvent(
    { patchState }: StateContext<EventsStateModel>,
    { payload }: DeleteEvent
  ) {
    return this.eventsService
      .deleteEvent(payload)
      .then((success: boolean) => {
        patchState({
          success,
        });
      })
      .catch(() => {
        patchState({
          success: false,
        });
      });
  }
}
