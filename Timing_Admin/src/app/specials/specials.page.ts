import { SchedulesService } from './../shared/services/schedules/schedules.service';
import { GroupsService } from './../shared/services/groups/groups.service';
import { GroupsModalComponent } from '../components/groups-modal/groups-modal.component';
import { DataTransferService } from './../shared/services/data-transfer/data-transfer.service';
import { UpdateSpecModalComponent } from '../components/update-spec-modal/update-spec-modal.component';
import { Specials } from './../shared/data/localdata';
import { AddSpecModalComponent } from '../components/add-spec-modal/add-spec-modal.component';
import { SpecialsService } from './../shared/services/specials/specials.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-specials',
  templateUrl: './specials.page.html',
  styleUrls: ['./specials.page.scss'],
})
export class SpecialsPage implements OnInit {

  chosenSpecial: Specials;
  specsView: Specials[] = [];
  selectedId: string;
  selectedName: string;

  constructor(
    private specialsService: SpecialsService,
    private modalCtrl: ModalController,
    private dataTransfer: DataTransferService,
    private alertCtrl: AlertController,
    private groupsService: GroupsService,
    private schedulesSerivce: SchedulesService,
    private loadingController: LoadingController
  ){}

  ngOnInit() {
    this.presentLoading().then(() => {
      this.chosenSpecial = undefined;
      this.getSpecials();
    })
  }

  //=========================================================================== Navigation & UI methods

  selectSpecial(special: Specials){
    let obj = special;
    this.dataTransfer.saveSpecial(obj);
  }

  showGroups(){
    if(!this.chosenSpecial){
      const message= 'Выберите специальность';
      this.presentAlert(message);
    }
    else{
      this.openGroupsModal();
    }
  }

  goBack(){
    document.location.href="/home";
  }

  async openGroupsModal(){
    const modal = await this.modalCtrl.create({
      component: GroupsModalComponent,
    });
    await modal.present();
  }

  async openAddModal(){
    const modal = await this.modalCtrl.create({
      component: AddSpecModalComponent,
    });
    await modal.present();
  }

  async openUpdateModal(){
    if(!this.chosenSpecial){
      const message = 'Вы не выбрали специальность';
      this.presentAlert(message);
    }
    else{
      const modal = await this.modalCtrl.create({
        component: UpdateSpecModalComponent,
      });
      await modal.present();
    }
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

  //===========================================================================



  //=========================================================================== Service methods

  getSpecials(){
    this.specialsService.getSpecials().subscribe(data => {
      this.specsView = data;
    });
  }

  async showDeleteAlert(){
    const alert = await this.alertCtrl.create({
      header:'Внимание, удаление приведёт к потере всех связанных данных, вы уверены?',
      buttons:[
        {
          text: 'Удалить',
          role: 'delete',
          handler: () => {
            this.deleteSpecial();
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

  deleteSpecial(){
   let id = this.dataTransfer.giveSpecialId();
   var index = this.specsView.indexOf(this.chosenSpecial, 0);
   let tmpspec = this.chosenSpecial;
   this.groupsService.getAll(tmpspec._id).subscribe(groups => {
     for(let group of groups){
      this.schedulesSerivce.deleteAll(group._id).subscribe();
     }
   })
   this.specsView.splice(index,1);
   this.specialsService.deleteSpecial(id).subscribe();
   const message = 'Специальность удалена';
   this.presentAlert(message);
  }
  //===========================================================================
}
