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

export class User{
    login: string;
    password: string;
    isAdmin: boolean

    constructor(inLogin: string, inPassword: string, isAdmin: boolean){
      this.login = inLogin;
      this.password = inPassword;
      this.isAdmin = isAdmin;
    }
}
export interface LoggedIn{
    token: string,
    login: string,
    isAdmin: boolean,
    id: string
}

export interface Registered{
    message: string
}

export class UserData{
    login: string;
    stay: string;
    isAdmin: string;
    token: string;
    id: string;

    constructor(inLogin: string, inStay: string, inIsAdmin: string, inToken: string, inId: string){
      this.login = inLogin;
      this.stay = inStay;
      this.isAdmin = inIsAdmin;
      this.token = inToken;
      this.id = inId;
    }

}
