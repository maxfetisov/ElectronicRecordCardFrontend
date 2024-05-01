export interface IUser {
  id: number,
  login: string,
  lastName: string,
  firstName: string,
  middleName?: string,
  phoneNumber?: string,
  email?: string,
  recordBookNumber?: string,
  groupId?: number,
  instituteId: number,
  roles?: number[]
}
