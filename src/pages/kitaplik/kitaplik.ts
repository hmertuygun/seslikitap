import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';
import { WelcomePage } from '../welcome/welcome';
import { AddBookPage } from '../add-book/add-book';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { BookListService } from '../../services/booklist/book.service';
import { Item } from '../../models/item/item.model';
import { App } from 'ionic-angular';
import 'rxjs/add/operator/map'
/**
 * Generated class for the KitaplikPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-kitaplik',
  templateUrl: 'kitaplik.html',
})
export class KitaplikPage {

  progress: number;
  items$: Observable<Item[]>;
  constructor(public app: App, private auth: AngularFireAuth, private booklist: BookListService,
    private storage: Storage, private toast: ToastController, public navCtrl: NavController) {
      this.progress = 50
     this.items$ = this.booklist
   .getBookList()
   .snapshotChanges()
   .map(
     changes => {
       return changes.map(c => ({
         key: c.payload.key, ...c.payload.val()
       }))
     });
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KitaplikPage');
  }
  public logout(){
    this.storage.remove('session')
    this.auth.auth.signOut();
    this.app.getRootNav().setRoot( WelcomePage );
  }

}
