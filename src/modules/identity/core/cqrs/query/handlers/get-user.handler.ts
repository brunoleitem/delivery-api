import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { UserRepository } from '@src/modules/identity/infra/user.repository'
import { GetUserDriverQuery } from '../get-user.query'

@QueryHandler(GetUserDriverQuery)
export class GetUserDriverHandler implements IQueryHandler<GetUserDriverQuery> {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(query: GetUserDriverQuery): Promise<boolean> {
    const { id } = query

    const user = await this.userRepository.findById(id)
    return user.getIsDriver()
  }
}
