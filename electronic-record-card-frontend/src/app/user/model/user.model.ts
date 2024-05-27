import {IVersion} from "../../version/model/version.model";

export interface IUser extends IVersion {
  id: number,
  login: string,
  password?: string,
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
