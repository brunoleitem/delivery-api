import { HttpException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UserRepository } from '../../../infra/user.repository'
import { User } from '../../domain/User'
import { CreateUserCommand } from '../command/create-user.command'

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const { name, password, email, isDriver } = command
    const existingUser = await this.userRepository.findByField('email', email)
    if (existingUser) {
      throw new HttpException('User already exists', 400)
    }
    const user = new User({ name, email, password: password, isDriver })
    await user.hashPassword()
    await this.userRepository.create(user)
  }
}
