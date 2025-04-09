import { Injectable } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { IdentityIntegrationApi } from '@src/shared/integration/identity/identity-integration.interface'
import { GetUserDriverQuery } from '../../core/cqrs/query/get-user.query'

@Injectable()
export class IdentityIntegrationProvider implements IdentityIntegrationApi {
  constructor(private readonly queryBus: QueryBus) {}

  async isDriver(userId: string): Promise<boolean> {
    return await this.queryBus.execute(new GetUserDriverQuery(userId))
  }
}
