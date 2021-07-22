import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/models/models';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

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

  constructor() {}

  ngOnInit(){}

}
