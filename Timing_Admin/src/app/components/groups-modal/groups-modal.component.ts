import { Specials, Groups } from '../../shared/data/localdata';
import { DataTransferService } from '../../shared/services/data-transfer/data-transfer.service';
import { GroupsService } from '../../shared/services/groups/groups.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { AddGroupModalComponent } from '../add-group-modal/add-group-modal.component';
import { UpdateGroupModalComponent } from '../update-group-modal/update-group-modal.component';
import { ScheduleComponent } from '../schedule/schedule.component';

@Component({
  selector: 'app-groups-modal',
  templateUrl: './groups-modal.component.html',
  styleUrls: ['./groups-modal.component.scss'],
})
export class GroupsModalComponent implements OnInit {

  //================================================== fields for view & requests
  showingGroups: Groups[] = [];
  name: string = '';
  selectedGroup: Groups;
  newName: string;
  newCourse: number;
  courses: number[] = [1,2,3,4];
  //================================================== fields for view & requests

  constructor(
    private groupsService: GroupsService,
    private dataTransfer: DataTransferService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    public loadingController: LoadingController
  ){}

  ngOnInit() {
    this.presentLoading().then(() => {
      let spc = this.dataTransfer.giveSpecial();
      this.name = spc.specName;
      this.groupsService.getAll(spc._id).subscribe(data => this.showingGroups = data);
    });
  }

  selectGroup(group: Groups){
    let obj = group;
    this.dataTransfer.saveGroup(obj);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Пожалуйста, подождите',
      duration: 2000,
      translucent: true
    });
    await loading.present();
    await loading.onDidDismiss();
  }

  async showAlert(){
    const alert = await this.alertCtrl.create({
      header:'Внимание, удаление приведёт к потере всех связанных данных, вы уверены?',
      buttons:[
        {
          text: 'Удалить',
          role: 'delete',
          handler: () => {
            this.deleteGroupById();
          }
        },
        {
          text: 'Отмена',
          role: 'cancel',
          handler: () => {
            this.alertCtrl.dismiss();
          }
        }
      ]
    });
    await alert.present();
  }
  goBack(){
    this.modalCtrl.dismiss();
  }

  deleteGroupById(){
    let id = this.dataTransfer.giveGroupId();
    let index = this.showingGroups.indexOf(this.selectedGroup, 0);
    this.showingGroups.splice(index,1);
    this.groupsService.deleteById(id).subscribe();
    this.presentAlert('Группа удалена');
  }

  async ShowAddModal(){
    this.dataTransfer.saveGroup(this.selectedGroup);
    const modal = await this.modalCtrl.create({
      component: AddGroupModalComponent,
    });
    await modal.present();
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

  async showUpdateModal(){
    if(!this.selectedGroup){
      return this.presentAlert('Выберите группу');
    }
    let modal = await this.modalCtrl.create({
      component: UpdateGroupModalComponent
    })
    await modal.present();
  }

  async showScheduleModal(){
    if(!this.selectedGroup){
      return this.presentAlert('Выберите группу');
    }
    let alert = await this.alertCtrl.create({
      header: 'Внимание!',
      message: 'Если на странице расписаний будет только числитель и знаменатель - просто задите на неё заново. Сервер сгенерирует расписания автоматически',
      buttons:[
        {
          text:'OK',
          role:'okay',
          handler: () => {
            this.alertCtrl.dismiss();
            this.presentLoading().then(() => this.Modal());
          },
        }
      ]
    });
    await alert.present();
  };

  async Modal(){
    let modal = await this.modalCtrl.create({
      component: ScheduleComponent
    })
    await modal.present();
  }

}
