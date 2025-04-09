import { BaseEntity } from '@src/shared/core/domain/base.entity'
import { NotificationType } from './value-objects'

interface NotificationProps {
  userId: string
  message: string
  type: NotificationType
  read: boolean
}

export class Notification extends BaseEntity<NotificationProps> {
  constructor(props: NotificationProps, id?: string) {
    super(props, id)
  }
  getUserId(): string {
    return this.props.userId
  }
  getMessage(): string {
    return this.props.message
  }
  getType(): NotificationType {
    return this.props.type
  }
  getRead(): boolean {
    return this.props.read
  }
  setUserId(userId: string): void {
    this.props.userId = userId
  }
  setMessage(message: string): void {
    this.props.message = message
  }
  setType(type: NotificationType): void {
    this.props.type = type
  }
  setRead(read: boolean): void {
    this.props.read = read
  }
  toJSON() {
    return {
      id: this.id,
      userId: this.props.userId,
      message: this.props.message,
      type: this.props.type,
      read: this.props.read
    }
  }
}
