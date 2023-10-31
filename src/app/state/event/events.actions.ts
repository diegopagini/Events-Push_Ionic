import { EventDDR } from 'src/app/interfaces/event.ddr';

export class CreateEvent {
  static readonly type = '[Events] Create Event';
  constructor(public payload: EventDDR) {}
}
