import { DataTransferService } from './../../shared/services/data-transfer.service';
import { Component, Input, OnInit } from '@angular/core';
import { Schedule, Pair } from 'src/app/shared/models/models';

@Component({
  selector: 'app-schedule-chisl',
  templateUrl: './schedule-chisl.component.html',
  styleUrls: ['./schedule-chisl.component.scss'],
})
export class ScheduleChislComponent implements OnInit {

  @Input() pairs: Pair[];

  constructor(
  ){}

  ngOnInit() {

  }

}
