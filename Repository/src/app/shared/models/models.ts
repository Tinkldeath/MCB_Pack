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

export interface User{
    _id: string,
    token: string,
    login: string,
    password: string,
    isAdmin: string,
    isModer: string,
    stays: string
}
export interface LoggedIn{
    token: string,
    user: User
}
export interface Registered{
    message: string
}
