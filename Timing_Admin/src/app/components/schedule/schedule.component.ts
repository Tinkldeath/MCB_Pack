import { Pairs } from './../../shared/data/localdata';
import { DataTransferService } from '../../shared/services/data-transfer/data-transfer.service';
import { SchedulesService } from '../../shared/services/schedules/schedules.service';
import { Schedules } from '../../shared/data/localdata';
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {

  pairsChisl: Pairs[];
  pairsZnam: Pairs[];
  groupName: string;
  idChisl: string = '';
  idZnam: string = '';

  constructor(
    private scheduleService: SchedulesService,
    private dataTransfer: DataTransferService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ){}

  ngOnInit(){
    this.getSchedule();
    let name = this.dataTransfer.giveGroupName();
    this.groupName = name;
  }

  getSchedule(){  //Успешно возвращает массив
    let grpId = this.dataTransfer.giveGroupId();
    this.scheduleService.getByGroupId(grpId).subscribe((data) => {
        this.dataTransfer.saveSchedulesArr(data);
        if(data === undefined){
          return console.log('Ошибка');
        }
        if(data[0].chisl === true){
          this.pairsChisl = data[0].pairs;
          this.pairsZnam = data[1].pairs;
          this.idChisl = data[0]._id;
          this.idZnam = data[1]._id;
        }
        else if(data[1].chisl === true){
          this.pairsChisl = data[1].pairs;
          this.pairsZnam = data[0].pairs;
          this.idChisl = data[1]._id;
          this.idZnam = data[0]._id;
        }
        else if(data[0].chisl === false){
          this.pairsZnam = data[0].pairs;
          this.pairsChisl = data[1].pairs;
          this.idChisl = data[1]._id;
          this.idZnam = data[0]._id;
        }
        else if(data[1].chisl === false){
          this.pairsZnam = data[1].pairs;
          this.pairsChisl = data[0].pairs;
          this.idChisl = data[0]._id;
          this.idZnam = data[1]._id;
        }
    })
  }

  updateSchedules(){
    this.scheduleService.updateById(this.idChisl,this.pairsChisl).subscribe();
    this.scheduleService.updateById(this.idZnam,this.pairsZnam).subscribe();
    this.presentAlert('Расписания обновлены');
  }

  async presentAlert(message:string) {
    const alert = await this.alertCtrl.create({
      message: message,
      buttons: [
        {
          text:'OK',
          role:'okay',
          handler: async () => {
            this.alertCtrl.dismiss();
          }
        }]
    });
    await alert.present();
  }

  goBack(){
    this.modalCtrl.dismiss();
  }
}
