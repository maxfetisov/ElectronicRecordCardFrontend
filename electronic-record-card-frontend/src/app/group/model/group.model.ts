import {IVersion} from "../../version/model/version.model";

export interface IGroup extends IVersion {
  id: number,
  name: string,
  fullName: string,
  admissionDate: Date,
  instituteId: number
}
