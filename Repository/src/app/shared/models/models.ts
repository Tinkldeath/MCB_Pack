export interface Post{
    title: string,
    subject: string,
    course: number,
    author: string,
    year: number,
    university: string,
    special: string,
    description: string
}

export interface Category{
    _id: string,
    name: string,
    description: string
}
export interface IUser{
  token: string,
  _id: string,
  login: string,
  password: string,
  isAdmin: boolean,
  isModer: boolean
}
export interface LoggedIn{
    token: string,
    user: IUser
}
export interface Registered{
    message: string
}
