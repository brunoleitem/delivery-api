export class AcceptDeliveryCommand {
  constructor(
    public readonly deliveryId: string,
    public readonly userId: string
  ) {}
}
