export interface IInput {

  label: string,

  name: string,

  type: string,

  value?: any,

  multiple?: boolean,

  options?: IOption[]

}

export interface IOption {

  id: any,

  title: string

}
