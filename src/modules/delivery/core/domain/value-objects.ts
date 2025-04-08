export enum DeliveryStatus {
  Pending = 'pending',
  Accepted = 'accepted',
  InTransit = 'in_transit',
  Delivered = 'delivered',
  Cancelled = 'cancelled'
}

export class Coordinates {
  lat: number
  lng: number
  constructor(lat: number, lng: number) {
    this.lat = lat
    this.lng = lng
  }

  getLat(): number {
    return this.lat
  }

  setLat(lat: number): void {
    this.lat = lat
  }

  getLng(): number {
    return this.lng
  }

  setLng(lng: number): void {
    this.lng = lng
  }
}
