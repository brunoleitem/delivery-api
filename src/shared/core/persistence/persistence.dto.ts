export interface IPaginateResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

export interface IQueryPaginate {
  page: number
  limit: number
}
