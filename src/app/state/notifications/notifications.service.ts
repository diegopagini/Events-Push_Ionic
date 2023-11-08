import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor() {}

  sendNotification(title: string, body: string): Promise<boolean> {
    return CapacitorHttp.post({
      url: 'https://fcm.googleapis.com/fcm/send',
      params: {},
      data: {
        notification: {
          title,
          body,
        },
        to: '/topics/events',
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `key=${environment.serverKey}`,
      },
    }).then((response: HttpResponse) => {
      console.log(response);
      return response.data.success > 0;
    });
  }
}
