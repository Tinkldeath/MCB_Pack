import { ReportComponent } from './../components/report/report.component';
import { Router } from '@angular/router';
import { GroupsService } from './../shared/services/groups.service';
import { DataTransferService } from './../shared/services/data-transfer.service';
import { SpecialsService } from '../shared/services/specials.service';
import { Special, Group } from './../shared/models/models';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { UserdataService } from '../shared/services/userdata.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  specs: Special[];
  groups: Group[];
  selectedSpecName: string;
  selectedSpecialId: string;
  selectedGroupName: string;
  selectedGroupId: string;
  stay: boolean = false;

  constructor(
    public router: Router,
    private modalCtrl: ModalController,
    private userdataService: UserdataService,
    private specialsService: SpecialsService,
    private dataTransfer: DataTransferService,
    private groupsService: GroupsService,
    private alertCtrl: AlertController,
  ){}

  ngOnInit(){
    this.userdataService.getStay().then(stay => {
      if(stay){
        this.userdataService.getGroupId().then(id => this.goSchedules(id));
      }
    });
    this.specialsService.getSpecials().subscribe(data => {
      this.specs = data;
      this.dataTransfer.saveSpecials(data);
    });
  }

  changeStay(){
    this.stay = !this.stay;
    if(!this.stay){
      this.userdataService.clearData();
    }
    console.log(this.stay);
  }

  groupCheck(){
      let special = this.dataTransfer.findSpecialByName(this.selectedSpecName);
      this.selectedSpecialId = special._id;
      this.groupsService.getGroups(this.selectedSpecialId).subscribe(data => {
        this.groups = data;
        this.dataTransfer.saveGroups(data);
      });
  }

  showSchedule(){
    if(this.selectedSpecName === undefined || this.selectedGroupName === undefined){
      return this.showMessage('Выберите специальность и группу');
    }
    else{
      let group = this.dataTransfer.findGroupByName(this.selectedGroupName);
      this.selectedGroupId = group._id;
      this.userdataService.setUserData(this.selectedGroupName,this.selectedGroupId,this.stay);
      this.goSchedules(this.selectedGroupId);
    }
  }

  async showMessage(message: string){
    let alert = await this.alertCtrl.create({
      header: message,
      buttons: [{
        text:'ОК',
        role:'Okay',
        handler: () => {
          this.alertCtrl.dismiss();
        }
      }]
    })
    await alert.present();
  }

  goSchedules(id: string){
    this.router.navigate(['/schedules'],{queryParams:{'groupId': id}});
  }

  async presentModal(){
    const modal = await this.modalCtrl.create({
      component: ReportComponent,
    });
    await modal.present();
  }
}
