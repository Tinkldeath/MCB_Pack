import { SchedulesService } from './../../shared/services/schedules/schedules.service';
import { Groups } from '../../shared/data/localdata';
import { DataTransferService } from '../../shared/services/data-transfer/data-transfer.service';
import { GroupsService } from '../../shared/services/groups/groups.service';
import { Component, Inject, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-group-modal',
  templateUrl: './add-group-modal.component.html',
  styleUrls: ['./add-group-modal.component.scss'],
})

export class AddGroupModalComponent implements OnInit {

  importedGroup: Groups;
  newName: string;
  course: number;
  courses: number[] = [1,2,3,4];

  constructor(
    private modalCtrl: ModalController,
    private groupsService: GroupsService,
    private dataTransfer: DataTransferService,
    private alertCtrl: AlertController,
    private schedulesService: SchedulesService,
  ){ }

  ngOnInit() {
    this.importedGroup = this.dataTransfer.giveGroup();
  }

  goBack(){
    this.modalCtrl.dismiss();
  }

  parseData(name: string, course: number){
    this.newName = name;
    this.course = course;
    this.addGroup();
  }

  addGroup(){
    if(!this.newName){
      return this.presentAlert('Введите название группы');
    }
    else{
      let spc = this.dataTransfer.giveSpecial();
      this.groupsService.addGroup(spc._id,this.newName,this.course).subscribe((group) => {
        this.dataTransfer.saveGroup(group);
      });
      this.presentAlert('Группа добавлена, обновите список');
      this.modalCtrl.dismiss();
    }
  }

  async presentAlert(message:string) {
    const alert = await this.alertCtrl.create({
      message: message,
      buttons: [
        {
          text:'OK',
          role:'okay',
          handler: () => {
            this.alertCtrl.dismiss();
          }
        }]
    });
    await alert.present();
  }

  help(){
    alert('Чтобы добавленные группы отобразились в приложении, нажмите на кнопку обновления в списке групп');
  }
}
