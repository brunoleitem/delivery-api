import { BaseEntity } from '@src/shared/core/domain/base.entity'
import { compare, hash } from 'bcryptjs'
interface UserProps {
  email: string
  password: string
  name: string
  isDriver: boolean
}

export class User extends BaseEntity<UserProps> {
  constructor(props: UserProps, id?: string) {
    super(props, id)
  }

  getEmail(): string {
    return this.props.email
  }

  getPassword(): string {
    return this.props.password
  }

  getName(): string {
    return this.props.name
  }

  getIsDriver(): boolean {
    return this.props.isDriver
  }

  setEmail(email: string): void {
    this.props.email = email
  }

  setPassword(password: string): void {
    this.props.password = password
  }

  setName(name: string): void {
    this.props.name = name
  }

  setIsDriver(isDriver: boolean): void {
    this.props.isDriver = isDriver
  }

  async hashPassword(): Promise<void> {
    const pass = await hash(this.getPassword(), 10)
    this.setPassword(pass)
  }
  async comparePassword(password: string): Promise<boolean> {
    return await compare(password, this.getPassword())
  }

  toJSON() {
    return {
      id: this.id,
      name: this.getName(),
      email: this.getEmail(),
      isDriver: this.getIsDriver()
    }
  }
}
