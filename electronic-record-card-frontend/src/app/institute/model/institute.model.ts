import {IVersion} from "../../version/model/version.model";

export interface IInstitute extends IVersion {
  id: number;
  name: string;
  fullName: string;
}
