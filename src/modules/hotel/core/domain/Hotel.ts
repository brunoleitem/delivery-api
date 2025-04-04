import { AggregateRoot } from '@nestjs/cqrs'

export class HotelDomain extends AggregateRoot {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly address: string
  ) {
    super()
  }

  getId(): string {
    return this.id
  }

  getName(): string {
    return this.name
  }

  getAddress(): string {
    return this.address
  }
}
