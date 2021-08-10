export interface IPost{
    _id: string,
    ownerId: string,
    postName: string,
    postTheme: string,
    courseNumber: number,
    author: string,
    year: number,
    university: string,
    subjectName: string,
    category: string,
    description: string,
    fileUrl: string
}

export interface ICategory{
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

export interface ISubject{
  _id: string,
  categoryName: string,
  name: string
}
