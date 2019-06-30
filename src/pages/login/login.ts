import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {  AlertController  } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private todo : FormGroup;
  constructor(public navCtrl: NavController, private storage: Storage, public alertCtrl: AlertController, public formBuilder: FormBuilder, public fire: AngularFireAuth, public navParams: NavParams) {
    this.todo = this.formBuilder.group({
    username: ['', Validators.required],
    pass: ['', Validators.required],
    description: ['']
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  access(){
    this.storage.set('session', this.todo.value.username);
    this.navCtrl.setRoot(TabsPage)
  }
  login(){
    const alert = this.alertCtrl.create({
      title: 'Hata!',
      subTitle: 'Giriş yapılırken sorun oluştu!',
      buttons: ['Tekrar Dene']
    });
    this.fire.auth.signInWithEmailAndPassword(this.todo.value.username, this.todo.value.pass).then(
      () => this.access(),
      error => alert.present()
    )
  }

}
