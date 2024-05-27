import {IVersion} from "../../version/model/version.model";

export interface ISubject extends IVersion {
  id?: number,
  name: string
}
