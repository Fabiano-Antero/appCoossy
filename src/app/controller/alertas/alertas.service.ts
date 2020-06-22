import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor(
    public toastController: ToastController,
    public alertController: AlertController) {}

  async presentAlert(title, msg) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      subHeader: title,
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }


  async alertaToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      buttons: ['OK'],
      position: 'top',
      duration: 10000

    });

    toast.present();
  }

}