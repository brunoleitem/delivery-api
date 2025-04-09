import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards
} from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { IQueryPaginate } from '@src/shared/core/persistence/persistence.dto'
import { JwtPayload } from '@src/shared/http/decorators/jwt-payload.decorator'
import { AuthGuard } from '@src/shared/http/guards/auth.guard'
import { IJwtPayload } from '@src/shared/http/interfaces/jwt-payload.interface'
import { AcceptDeliveryCommand } from '../core/cqrs/command/accept-delivery.command'
import { CreateDeliveryCommand } from '../core/cqrs/command/create-delivery.command'
import { ListAvailableDeliveryQuery } from '../core/cqrs/query/list-available-delivery.query'
import { ListDeliveryQuery } from '../core/cqrs/query/list-delivery.query'
import { DeliveryNamespace } from './delivery.request.namespace'

@UseGuards(AuthGuard)
@Controller('/api/delivery')
export class DeliveryController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createDelivery(
    @Body() body: DeliveryNamespace.CreateBody,
    @JwtPayload() payload: IJwtPayload
  ) {
    return await this.commandBus.execute(
      new CreateDeliveryCommand(
        body.origin,
        body.destination,
        body.destinationAddress,
        payload.id,
        body.packageInfo
      )
    )
  }

  @Get('user')
  @HttpCode(HttpStatus.OK)
  async listDelivery(
    @Query() query: IQueryPaginate,
    @JwtPayload() payload: IJwtPayload
  ) {
    return await this.queryBus.execute(
      new ListDeliveryQuery(payload.id, query.page, query.limit)
    )
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async listAllDelivery(@Query() query: IQueryPaginate) {
    return await this.queryBus.execute(
      new ListAvailableDeliveryQuery(query.page, query.limit)
    )
  }

  @Post(':id/accept')
  @HttpCode(HttpStatus.OK)
  async acceptDelivery(
    @Param('id') id: string,
    @JwtPayload() payload: IJwtPayload
  ) {
    return await this.commandBus.execute(
      new AcceptDeliveryCommand(id, payload.id)
    )
  }
}
