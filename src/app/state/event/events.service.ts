import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import {
  Database,
  DataSnapshot,
  get,
  getDatabase,
  orderByChild,
  push,
  query,
  ref,
  remove,
  set,
  startAt,
} from '@angular/fire/database';
import * as moment from 'moment';
import { EventDDR } from 'src/app/interfaces/event.ddr';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private database: Database;

  constructor(fApp: FirebaseApp) {
    this.database = getDatabase(fApp);
  }

  createEvent(event: EventDDR): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        const eventRef = ref(this.database, 'events');
        const newRef = push(eventRef);
        event.id = newRef.key!;

        set(newRef, {
          ...event,
        });

        resolve(true);
      } catch (error) {
        reject(false);
      }
    });
  }

  updateEvent(event: EventDDR): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        const eventRef = ref(this.database, 'events/' + event.id);

        set(eventRef, {
          ...event,
        });

        resolve(true);
      } catch (error) {
        reject(false);
      }
    });
  }

  deleteEvent(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        const eventRef = ref(this.database, 'events/' + id);

        remove(eventRef);

        resolve(true);
      } catch (error) {
        reject(false);
      }
    });
  }

  getFutureEvents(): Promise<DataSnapshot> {
    const queryDB = query(
      ref(this.database, 'events'),
      orderByChild('start'),
      startAt(moment().format('YYYY-MM-DDTHH:mm'))
    );
    return get(queryDB);
  }
}
