import { IsBoolean, IsString } from 'class-validator'
export namespace UserRequest {
  export class CreateUserBody {
    @IsString()
    name: string
    @IsString()
    email: string
    @IsString()
    password: string
    @IsBoolean()
    isDriver: boolean
  }

  export class LoginUserBody {
    @IsString()
    email: string
    @IsString()
    password: string
  }
}
