import { Specials } from '../../shared/data/localdata';
import { SpecialsService } from '../../shared/services/specials/specials.service';
import { DataTransferService } from '../../shared/services/data-transfer/data-transfer.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-update-spec-modal',
  templateUrl: './update-spec-modal.component.html',
  styleUrls: ['./update-spec-modal.component.scss'],
})
export class UpdateSpecModalComponent implements OnInit{

  importedSpecial: Specials;
  newName: string;

  constructor(
    private dataTransfer: DataTransferService,
    private modalCtrl: ModalController,
    private specialsService: SpecialsService,
    private alertCtrl: AlertController
  ){}

  ngOnInit(){
    this.importedSpecial = this.dataTransfer.giveSpecial();
  }

  goBack(){
    this.modalCtrl.dismiss();
  }

  updateSpecial(){
    console.log(this.newName);
    const name = this.newName;
    if( name === '' || name === this.importedSpecial.specName){
      return this.presentAlert('Введите новое название');
    }
    else{
      this.specialsService.updateSpecial(this.importedSpecial._id.toString(),this.newName).subscribe();
      return this.presentAlert('Специальность обновлена, обновите список');
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
}
