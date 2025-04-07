import 'express'
import { IJwtPayload } from '../http/interfaces/jwt-payload.interface'

declare module 'express' {
  export interface Request {
    user?: IJwtPayload
  }
}
