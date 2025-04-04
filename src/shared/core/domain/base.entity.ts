import mongoose from 'mongoose'

export abstract class BaseEntity<Props> {
  private readonly _id:  mongoose.Types.ObjectId
  protected readonly props: Props

  constructor(props: Props, id?:  mongoose.Types.ObjectId) {
    this.props = props
    this._id = id 
  }

  get id(): string {
    return this._id.toString()
  }
}