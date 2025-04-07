export abstract class BaseEntity<Props> {
  protected readonly _id: string
  protected readonly props: Props
  protected createdAt: Date
  protected updatedAt: Date

  constructor(props: Props, id?: string) {
    this._id = id
    this.props = props
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  public get id(): string {
    return this._id
  }

  public update() {
    this.updatedAt = new Date()
  }
}
