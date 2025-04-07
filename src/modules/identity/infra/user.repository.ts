import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { BaseRepository } from '@src/shared/core/persistence/base.repository'
import { Model } from 'mongoose'
import { User } from '../core/domain/User'
import { UserDocument, UserSchema } from './user.schema'

@Injectable()
export class UserRepository extends BaseRepository<UserDocument, User> {
  constructor(
    @InjectModel(UserSchema.name)
    private readonly userModel: Model<UserDocument>
  ) {
    super(userModel)
  }

  protected mapToEntity(model: UserDocument): User {
    return new User(
      {
        email: model.email,
        isDriver: model.isDriver,
        name: model.name,
        password: model.password
      },
      model.id
    )
  }

  protected mapToSchema(entity: User): any {
    return {
      email: entity.getEmail(),
      password: entity.getPassword(),
      name: entity.getName(),
      isDriver: entity.getIsDriver()
    }
  }
}
