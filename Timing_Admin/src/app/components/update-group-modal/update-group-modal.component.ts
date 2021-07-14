import { Groups } from '../../shared/data/localdata';
import { GroupsService } from '../../shared/services/groups/groups.service';
import { DataTransferService } from '../../shared/services/data-transfer/data-transfer.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-update-group-modal',
  templateUrl: './update-group-modal.component.html',
  styleUrls: ['./update-group-modal.component.scss'],
})
export class UpdateGroupModalComponent implements OnInit {

  importedGroup: Groups;
  newName: string;
  course: number;
  courses: number[] = [1,2,3,4];

  constructor(
    private dataTransfer: DataTransferService,
    private modalCtrl: ModalController,
    private groupService: GroupsService,
    private alertCtrl: AlertController
  ){}

  ngOnInit() {
    this.importedGroup = this.dataTransfer.giveGroup();
  }

  help(){

  }
  update(){
    if(this.course === undefined){
      return this.presentAlert('Выберите курс');
    }
    else if(this.newName === undefined){
      return this.presentAlert('Введите новое имя');
    }
    let grpId = this.importedGroup._id.toString();
    let crs = this.course;
    this.groupService.updateGroup(grpId,this.newName,crs).subscribe();
    this.presentAlert('Группа обновлена, обновите список');
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

  goBack(){
    this.modalCtrl.dismiss();
  }
}
