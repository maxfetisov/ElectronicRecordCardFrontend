import {IVersion} from "../../version/model/version.model";

export interface IControlType extends IVersion {
  id: number,
  name: string,
  title: string
}
