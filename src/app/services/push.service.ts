import { Injectable } from '@angular/core';
import { FCM } from '@capacitor-community/fcm';
import { Capacitor } from '@capacitor/core';
import {
  PermissionStatus,
  PushNotifications,
  PushNotificationSchema,
  Token,
} from '@capacitor/push-notifications';

@Injectable({
  providedIn: 'root',
})
export class PushService {
  async init(): Promise<void> {
    const isPushNotificationAvailable =
      Capacitor.isPluginAvailable('PushNotification');

    if (isPushNotificationAvailable) {
      const result: PermissionStatus =
        await PushNotifications.requestPermissions();

      if (result.receive) {
        await PushNotifications.register();

        FCM.subscribeTo({
          topic: 'events',
        });
      } else console.error('No granted');
    }

    PushNotifications.addListener('registration', (token: Token) => {
      console.log(token);
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log(notification);
      }
    );
  }
}
