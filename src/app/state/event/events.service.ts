import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Database, getDatabase, push, ref, set } from '@angular/fire/database';
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
        const newRef = push(eventRef)
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
}
