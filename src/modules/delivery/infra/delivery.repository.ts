import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { BaseRepository } from '@src/shared/core/persistence/base.repository'
import { Model } from 'mongoose'
import { Delivery } from '../core/domain/delivery'
import { Coordinates } from '../core/domain/value-objects'
import { DeliveryDocument, DeliverySchema } from './delivery.schema'

@Injectable()
export class DeliveryRepository extends BaseRepository<
  DeliveryDocument,
  Delivery
> {
  constructor(
    @InjectModel(DeliverySchema.name)
    private readonly deliveryModel: Model<DeliveryDocument>
  ) {
    super(deliveryModel)
  }

  protected mapToEntity(model: DeliveryDocument): Delivery {
    const origin = new Coordinates(
      model.origin.coordinates[0],
      model.origin.coordinates[1]
    )

    const destination = new Coordinates(
      model.destination.coordinates[0],
      model.destination.coordinates[1]
    )

    return new Delivery(
      {
        customerId: model.customerId,
        origin,
        destination,
        destinationAddress: model.destinationAddress,
        status: model.status,
        driverId: model.driverId,
        packageInfo: model.packageInfo
      },
      model.id
    )
  }

  protected mapToSchema(entity: Delivery): any {
    return {
      customerId: entity.getCustomerId(),
      origin: {
        type: 'Point',
        coordinates: [entity.getOrigin().getLat(), entity.getOrigin().getLng()]
      },
      destinationAddress: entity.getDestinationAddress(),
      destination: {
        type: 'Point',
        coordinates: [
          entity.getDestination().getLat(),
          entity.getDestination().getLng()
        ]
      },
      status: entity.getStatus(),
      driverId: entity.getDriverId(),
      packageInfo: entity.getPackageInfo()
    }
  }
}
