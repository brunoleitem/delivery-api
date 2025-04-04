import { BaseEntity } from '@src/shared/core/domain/base.entity'
import mongoose from 'mongoose'

interface HotelProps {
  name: string
  address: string
}

export class HotelDomain extends BaseEntity<HotelProps> {
  constructor(props: HotelProps, id?: string) {
    super(props, id ? new mongoose.Types.ObjectId(id) : undefined)
  }

  getName(): string {
    return this.props.name
  }

  getAddress(): string {
    return this.props.address
  }

  setName(name: string): void {
    this.props.name = name
  }

  setAddress(address: string): void {
    this.props.address = address
  }

  toJSON() {
    return {
      id: this.id,
      name: this.getName(),
      address: this.getAddress()
    }
  }
  
}