export interface IdentityIntegrationApi {
  isDriver(userId: string): Promise<boolean>
}

export const IdentityIntegrationApi = Symbol('IdentityIntegrationApi')
