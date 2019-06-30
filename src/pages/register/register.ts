import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private todo : FormGroup;
  constructor(public navCtrl: NavController, private storage: Storage, private formBuilder: FormBuilder, public fire: AngularFireAuth, public navParams: NavParams) {
    this.todo = this.formBuilder.group({
    username: ['', Validators.required],
    pass: ['', Validators.required],
    description: ['']
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  async register(){
    const result = this.fire.auth.createUserWithEmailAndPassword(this.todo.value.username, this.todo.value.pass)
    console.log(result)
    this.storage.set('session', this.todo.value.username);
    this.navCtrl.push(TabsPage)
  }

}
