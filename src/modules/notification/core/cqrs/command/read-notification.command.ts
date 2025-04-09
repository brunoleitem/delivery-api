export class ReadNotificationCommand {
  constructor(
    public readonly id: string,
    public readonly userId: string
  ) {}
}
