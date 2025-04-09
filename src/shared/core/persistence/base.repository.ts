import { FilterQuery, HydratedDocument, Model } from 'mongoose'
import { IPaginateResponse } from './persistence.dto'

interface PaginateOptions {
  page: number
  limit: number
  filter?: FilterQuery<any>
}

export abstract class BaseRepository<
  TModel extends HydratedDocument<any, any, any>,
  TEntity
> {
  protected constructor(protected readonly model: Model<TModel>) {}

  async create(entity: TEntity): Promise<TEntity> {
    const created = new this.model(this.mapToSchema(entity))
    const result = await created.save()
    return this.mapToEntity(result)
  }

  async findByField(
    field: keyof TModel,
    value: string | number
  ): Promise<TEntity | null> {
    const doc = await this.model
      .findOne({ [field]: value, deletedAt: null } as any)
      .exec()
    return doc ? this.mapToEntity(doc) : null
  }

  async findById(id: string): Promise<TEntity | null> {
    const doc = await this.model
      .findOne({ _id: id, deletedAt: null } as any)
      .exec()
    return doc ? this.mapToEntity(doc) : null
  }

  async findBy(
    filters: Partial<Record<keyof TModel, any>>
  ): Promise<TEntity | null> {
    const query = {
      ...filters,
      deletedAt: null
    }

    const doc = await this.model.findOne(query as any).exec()
    return doc ? this.mapToEntity(doc) : null
  }

  async findAll(filter: FilterQuery<TModel> = {}): Promise<TEntity[]> {
    const docs = await this.model.find({ ...filter, deletedAt: null }).exec()
    return docs.map(this.mapToEntity)
  }

  async update(id: string, entity: TEntity): Promise<TEntity | null> {
    const doc = await this.model
      .findOneAndUpdate(
        { _id: id, deletedAt: null } as any,
        this.mapToSchema(entity),
        {
          new: true
        }
      )
      .exec()
    return doc ? this.mapToEntity(doc) : null
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.deleteOne({ _id: id }).exec()
    return result.deletedCount > 0
  }

  async softDelete(id: string): Promise<boolean> {
    const res = await this.model
      .updateOne({ _id: id, deletedAt: null } as any, { deletedAt: new Date() })
      .exec()
    return res.modifiedCount > 0
  }

  async paginate({
    page,
    limit,
    filter = {}
  }: PaginateOptions): Promise<IPaginateResponse<TEntity>> {
    const skip = (page - 1) * limit
    const query = { ...filter, deletedAt: null } as FilterQuery<TModel>

    const [data, total] = await Promise.all([
      this.model.find(query).skip(skip).limit(limit).exec(),
      this.model.countDocuments(query)
    ])

    return {
      data: data.map(this.mapToEntity),
      total,
      page,
      limit
    }
  }

  protected abstract mapToEntity(model: TModel): TEntity
  protected abstract mapToSchema(entity: TEntity): any
}
