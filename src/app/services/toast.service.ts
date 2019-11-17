import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable()
export class ToastService {
  constructor(private toastCtrl: ToastController) {}

  async showToast(msg: string, status: "error" | "success" = null) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      cssClass: status === "error" ? "errorClass" : "successClass"
    });
    await toast.present();
  }
}
