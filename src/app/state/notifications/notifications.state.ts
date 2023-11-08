import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { SendNotification } from './notifications.actions';
import { NotificationsService } from './notifications.service';

export class NotificationsStateModel {
  success: boolean;
}

const defaults = {
  success: false,
};

@State<NotificationsStateModel>({
  name: 'notifications',
  defaults,
})
@Injectable()
export class NotificationsState {
  constructor(private _notificationService: NotificationsService) {}

  @Selector()
  static success(state: NotificationsStateModel) {
    return state.success;
  }

  @Action(SendNotification)
  SendNotification(
    { patchState }: StateContext<NotificationsStateModel>,
    { payload }: SendNotification
  ) {
    return this._notificationService
      .sendNotification(payload.title, payload.body)
      .then((success: boolean) => {
        patchState({ success });
      });
  }
}
