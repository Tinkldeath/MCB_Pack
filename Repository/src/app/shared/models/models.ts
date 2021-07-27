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
    private _id: string;
    private token: string;
    private login: string;
    private password: string;
    private isAdmin: boolean;
    private isModer: boolean;
    private stays: boolean;

    constructor(id: string, token: string, login: string, passwod: string, admin: boolean, moder: boolean, stays: boolean){
      this._id = id;
      this.token = token;
      this.login = login;
      this.password = passwod;
      this.isAdmin = admin;
      this.isModer = moder;
      this.stays = stays;
    }

    GetToken(){
      return this.token;
    }

    GetId(){
      return this._id;
    }

    GetLogin(){
      return this.login;
    }

    GetPassword(){
      return this.password;
    }

    GetAdmin(){
      return this.isAdmin;
    }

    GetModer(){
      return this.isModer;
    }

    GetStays(){
      return this.stays;
    }
}

export interface IUser{
  _id: string,
  login: string,
  password: string,
  isAdmin: boolean,
  isModer: boolean,
  stays: boolean
}
export interface LoggedIn{
    token: string,
    user: IUser
}
export interface Registered{
    message: string
}
