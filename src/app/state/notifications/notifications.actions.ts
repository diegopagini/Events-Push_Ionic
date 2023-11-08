export class SendNotification {
  static readonly type = '[Notifications] Send';
  constructor(public payload: { title: string; body: string }) {}
}
