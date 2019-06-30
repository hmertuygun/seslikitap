import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BookListService } from '../../services/booklist/book.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map'
import { Item } from '../../models/item/item.model';
import { NativeAudio } from '@ionic-native/native-audio';
export interface ItemId extends Item { adi: string; }


@IonicPage()
@Component({
  selector: 'page-dinle',
  templateUrl: 'dinle.html',
})
export class DinlePage {
  items$: Observable<Item[]>;
  id: any;
  details: any;
  i: number;
  constructor(private nativeAudio: NativeAudio, private booklist: BookListService, public navCtrl: NavController, public navParams: NavParams) {
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
  }

  ionViewDidLoad() {
    this.nativeAudio.preloadComplex('uniqueId2', 'https://firebasestorage.googleapis.com/v0/b/seslikitap-30cb4.appspot.com/o/Kutsi%20-%20Ba%C5%9F%C4%B1m%C4%B1z%20Sa%C4%9F%20Olsun%20-%20(Official%20Video).mp3?alt=media&token=0e8344c1-265e-4b5e-ace9-0c2ae647b4be', 1, 1, 0);
      this.nativeAudio.play('uniqueId2', () => console.log('uniqueId1 is done playing'));
  }

}
