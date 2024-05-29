import {IVersion} from "../../version/model/version.model";

export interface IUserSubjectControlType extends IVersion {

  id?:  number,

  semester: number,

  hoursNumber: number,

  note?: string,

  teacherId: number,

  studentId: number,

  subjectId: number,

  controlTypeId: number,

}

export interface IUserSubjectControlTypeByGroup {

  semester: number,

  hoursNumber: number,

  note?: string,

  teacherId: number,

  groupId: number,

  subjectId: number,

  controlTypeId: number,

}
