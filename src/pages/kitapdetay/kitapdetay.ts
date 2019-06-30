import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BookListService } from '../../services/booklist/book.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Item } from '../../models/item/item.model';
import { ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Media, MediaObject } from '@ionic-native/media';
export interface ItemId extends Item { adi: string; }

/**
 * Generated class for the KitapdetayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-kitapdetay',
  templateUrl: 'kitapdetay.html',
})
export class KitapdetayPage {
  items$: Observable<Item[]>;
  id: any;
  details: any;
  i: 0;    
  adi: any;
  yazarr: any;
  orijinaladi: any;
  baskitarihi: any;
  hakkinda: any;
  resimurl: any;
  adres: any;
  sayfa: any;
  tur: any;
  yayinevi: any;
  file : MediaObject;
  filep: any;
  playing: any;
  played: boolean;

  
  constructor( public viewCtrl: ViewController, private media: Media, private storage: Storage, private booklist: BookListService, public navCtrl: NavController, public navParams: NavParams) {
    this.id = this.navParams.get("id")
    this.items$ = this.booklist
    .getBookList()
    .snapshotChanges()
    .map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      });
      this.items$.forEach(vv => {
        vv.forEach(aa => {
          if(aa.key == this.id){
            this.adi = aa.adi
            this.yazarr = aa.yazar
            this.adres = aa.adres
            this.orijinaladi = aa.orijinaladi
            this.baskitarihi = aa.baskitarihi
            this.hakkinda = aa.hakkinda
            this.sayfa = aa.sayfa
            this.tur = aa.tur
            this.yayinevi = aa.yayinevi
            this.resimurl = aa.resimurl
            console.log(this.adi)
           }
        });
        
      });
       
    }

  ionViewDidLoad() {
    this.viewCtrl.setBackButtonText('Cancel');
    this.storage.get('playingnow').then((val) => {
      this.played = val[0]
      this.playing = val[1]
    })
 }
 public kitapdinle(){
  this.playing = this.adi
  this.file =  this.media.create(this.adres)
  this.played = true
  this.storage.set('playingnowyeah', this.adi)
  this.storage.set('playingnowstatus', this.played)
  this.storage.set('playingnow', [this.played, this.adi, this.adres])
  console.log(this.played)
}

}