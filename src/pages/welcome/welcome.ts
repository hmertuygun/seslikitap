import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(private storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.storage.get('session').then((val) => {
      if(val != null){
        this.navCtrl.setRoot(TabsPage)
      }
    });
  }
gotoLogin(){
  this.navCtrl.push(LoginPage)
}
gotoSignup(){
  this.navCtrl.push(RegisterPage)
}
}
