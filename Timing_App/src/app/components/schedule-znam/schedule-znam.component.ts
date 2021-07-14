import { Pair } from './../../shared/models/models';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule-znam',
  templateUrl: './schedule-znam.component.html',
  styleUrls: ['./schedule-znam.component.scss'],
})
export class ScheduleZnamComponent implements OnInit {

  @Input() pairs: Pair[];
  constructor() {}

  ngOnInit() {}

}
