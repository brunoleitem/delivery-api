export class CreateDeliveryCommand {
  constructor(
    public readonly origin: { lat: number; lng: number },
    public readonly destination: { lat: number; lng: number },
    public readonly destinationAddress: string,
    public readonly customerId: string,
    public readonly packageInfo?: string
  ) {}
}
