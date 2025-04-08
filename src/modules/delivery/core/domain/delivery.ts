import { BaseEntity } from '@src/shared/core/domain/base.entity'
import { Coordinates, DeliveryStatus } from './value-objects'
interface DeliveryProps {
  origin: Coordinates
  destination: Coordinates
  destinationAddress: string
  customerId: string
  driverId?: string
  status: DeliveryStatus
  packageInfo?: string
}

export class Delivery extends BaseEntity<DeliveryProps> {
  constructor(props: DeliveryProps, id?: string) {
    super(props, id)
  }

  getOrigin(): Coordinates {
    return this.props.origin
  }
  getDestination(): Coordinates {
    return this.props.destination
  }
  getDestinationAddress(): string {
    return this.props.destinationAddress
  }
  getCustomerId(): string {
    return this.props.customerId
  }
  getDriverId(): string | undefined {
    return this.props.driverId
  }
  getStatus(): DeliveryStatus {
    return this.props.status
  }
  getPackageInfo(): string | undefined {
    return this.props.packageInfo
  }
  setOrigin(origin: Coordinates): void {
    this.props.origin = origin
  }
  setDestination(destination: Coordinates): void {
    this.props.destination = destination
  }
  setDestinationAddress(destinationAddress: string): void {
    this.props.destinationAddress = destinationAddress
  }
  setCustomerId(customerId: string): void {
    this.props.customerId = customerId
  }
  setDriverId(driverId: string): void {
    this.props.driverId = driverId
  }

  setPackageInfo(packageInfo: string): void {
    this.props.packageInfo = packageInfo
  }

  toJSON() {
    return {
      id: this.id,
      origin: this.getOrigin(),
      destination: this.getDestination(),
      destinationAddress: this.getDestinationAddress(),
      customerId: this.getCustomerId(),
      driverId: this.getDriverId(),
      status: this.getStatus(),
      packageInfo: this.getPackageInfo()
    }
  }
}
