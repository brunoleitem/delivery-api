export class ListAvailableDeliveryQuery {
  constructor(
    public readonly page: number,
    public readonly limit: number
  ) {}
}
