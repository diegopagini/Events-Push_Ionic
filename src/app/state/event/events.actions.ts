import { EventDDR } from 'src/app/interfaces/event.ddr';

export class CreateEvent {
  static readonly type = '[Events] Create Event';
  constructor(public payload: EventDDR) {}
}

export class UpdateEvent {
  static readonly type = '[Events] Update Event';
  constructor(public payload: EventDDR) {}
}

export class DeleteEvent {
  static readonly type = '[Events] Delete Event';
  constructor(public payload: string) {}
}

export class GetFutureEvents {
  static readonly type = '[Events] Get Future Events';
}
