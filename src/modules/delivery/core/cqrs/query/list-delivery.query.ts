export class ListDeliveryQuery {
  constructor(
    public readonly customerId: string,
    public readonly page: number,
    public readonly limit: number
  ) {}
}
