import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Item } from '../../models/item/item.model';
import { BookListService } from '../../services/booklist/book.service';

/**
 * Generated class for the AddBookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-book',
  templateUrl: 'add-book.html',
})
export class AddBookPage {
/* item: Item = {
   adi: '',
   yazar: '',
   orijinaladi: '',
   baskitarihi: '',
   hakkinda: '',
   resimurl: '',
   adres: '',
   sayfa: '',
   tur: '',
   yayinevi: '',
   yer: ''
 }*/
  constructor(public navCtrl: NavController, public navParams: NavParams, private booklist: BookListService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddBookPage');
  }
  addItem(item: Item){
    this.booklist.addItem(item).then(ref => {
      console.log(ref.key)
    })
  }

}
