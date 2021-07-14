import { UserdataService } from './../shared/services/userdata.service';
import { Pair } from './../shared/models/models';
import { DataTransferService } from './../shared/services/data-transfer.service';
import { SchedulesService } from './../shared/services/schedules.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router'
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.page.html',
  styleUrls: ['./schedules.page.scss'],
})
export class SchedulesPage implements OnInit {

  isChisl: boolean = true;
  groupId: string;
  groupName: string;
  pairsChisl: Pair[];
  pairsZnam: Pair[];

  private querySubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private schedulesService: SchedulesService,
    private dataTransfer: DataTransferService,
    private userdataService: UserdataService
  ) {
      this.querySubscription = route.queryParams.subscribe(
        (queryParam: any) => {
          this.groupId = queryParam['groupId'];
        }
      );
  }

  ngOnInit() {
    this.schedulesService.getSchedules(this.groupId).subscribe(data => {
      this.dataTransfer.saveSchedules(data);
      this.pairsChisl = this.dataTransfer.givePairsChisl();
      this.pairsZnam = this.dataTransfer.givePairsZnam();
      this.userdataService.getGroupName().then(name => this.groupName = name);
    });
  }

  goBack(){
    this.userdataService.clearData();
    this.router.navigate(['']);
  }

  changeChislToChisl(){
    this.isChisl = true;
  }

  changeChislToZnam(){
    this.isChisl = false;
  }

}
