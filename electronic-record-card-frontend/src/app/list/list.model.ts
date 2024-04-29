export interface IListItem {
  id: number,
  text: string,
  additionalText?: string
}

export interface IButton {
  icon: string,
  action: Function
}
