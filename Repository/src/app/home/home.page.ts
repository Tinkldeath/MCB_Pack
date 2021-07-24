import { DataService } from './../shared/services/data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category, UserData } from '../shared/models/models';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy{

  categories: Category[] = [
    {subject: "Subject", description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit."},
    {subject: "Subject", description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit."},
    {subject: "Subject", description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit."},
    {subject: "Subject", description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit."},
    {subject: "Subject", description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit."},
    {subject: "Subject", description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit."},
    {subject: "Subject", description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit."},
    {subject: "Subject", description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit."},
    {subject: "Subject", description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit."},
    {subject: "Subject", description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit."},
    {subject: "Subject", description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit."},
    {subject: "Subject", description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit."},
    {subject: "Subject", description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit."},
    {subject: "Subject", description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit."},
  ]

  userdata: UserData = null;

  constructor(private dataService: DataService) {
    this.dataService.currentMessage.subscribe(message => this.userdata = message);
  }

  ngOnInit(){
    this.dataService.currentMessage.subscribe(message => this.userdata = message);
    const token = localStorage.getItem('token');
    const login = localStorage.getItem('login');
    const isAdmin = localStorage.getItem('isAdmin');
    const stay = localStorage.getItem('stay');
    const id = localStorage.getItem('id');
    this.userdata = new UserData(login,stay,isAdmin,token,id);
    console.log(this.userdata);
  }

  Logout(){
    localStorage.clear();
    this.userdata.login = null;
    this.userdata.id = null;
    this.userdata.isAdmin = null;
    this.userdata.stay = null;
    this.userdata.token = null;
  }

  ngOnDestroy(){
    if(this.userdata.stay !== "true"){
      localStorage.clear();
      this.userdata.login = null;
      this.userdata.id = null;
      this.userdata.isAdmin = null;
      this.userdata.stay = null;
      this.userdata.token = null;
    }
  }

}
