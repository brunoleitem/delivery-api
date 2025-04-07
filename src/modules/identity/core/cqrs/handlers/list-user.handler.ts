import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { UserRepository } from '../../../infra/user.repository'
import { User } from '../../domain/User'
import { ListUserQuery } from '../query/list-hotel.query'

@QueryHandler(ListUserQuery)
export class ListUserHandler implements IQueryHandler<ListUserQuery> {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(): Promise<User[]> {
    return await this.userRepository.findAll()
  }
}
