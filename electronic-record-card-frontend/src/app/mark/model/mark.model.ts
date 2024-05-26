import {IVersion} from "../../version/model/version.model";

export interface IMark extends IVersion {
  id: number,
  name: string,
  title: string,
  value: number
}
