export interface IAuthRequest {

  login: string,

  password: string

}

export interface IAuthResponse {

  token: string,

  refreshToken: string

}

export interface IChangePasswordRequest {

  oldPassword: string,

  newPassword: string

}

export interface IRole {

  id?: number,

  name?: Role

}

export interface IRefreshRequest {

  refreshToken: string

}

export enum Role {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  DEAN_OFFICE_EMPLOYEE = "DEAN_OFFICE_EMPLOYEE",
  ADMINISTRATOR = "ADMINISTRATOR"
}
