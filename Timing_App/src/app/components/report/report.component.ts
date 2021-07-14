import { ModalController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {

  mailbox: string;
  problem: string;

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private emailComposer: EmailComposer
  ) { }

  ngOnInit() {}

  close(){
    this.modalCtrl.dismiss();
  }

  sendReport(){
    if(this.mailbox === undefined){
      return this.showMessage('Введите свой адрес эл. почты');
    }
    else if(this.problem === undefined){
      return this.showMessage('Опишите проблему');
    }
    else{
      this.emailComposer.getClients().then()
      let email = {
        to: 'dropdeadit@gmail.com',
        cc: this.mailbox,
        subject: 'Проблема mcb.timing клиент',
        body: this.problem,
      }
      this.emailComposer.open(email);
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
}
