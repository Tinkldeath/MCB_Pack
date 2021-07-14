import { Specials } from '../../shared/data/localdata';
import { SpecialsService } from '../../shared/services/specials/specials.service';
import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-spec-modal',
  templateUrl: './add-spec-modal.component.html',
  styleUrls: ['./add-spec-modal.component.scss'],
})
export class AddSpecModalComponent{

  newSpecName: string;

  constructor(
    private modalCtrl: ModalController,
    private specialsService: SpecialsService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {}

  help(){
    this.presentAlert('После добавления специальности добавляйте группы для связки, при удалении все связанные данные тоже удаляются автоматически');
  }

  goBack(){
    this.modalCtrl.dismiss();
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

  addSpecial(){
    if(!this.newSpecName){
      return this.presentAlert('Введите название специальности');
    }
    else{
      this.presentAlert('Специальность добавлена в базу, обновите список');
      this.specialsService.addSpecial(this.newSpecName).subscribe();
      this.alertCtrl.dismiss();
    }
  }
}
