import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';
import { WelcomePage } from '../welcome/welcome';
import { AddBookPage } from '../add-book/add-book';
import { Observable } from 'rxjs/Observable';
import { BookListService } from '../../services/booklist/book.service';
import { Item } from '../../models/item/item.model';
import { KitapdetayPage } from '../kitapdetay/kitapdetay';
import { App } from 'ionic-angular';
import 'rxjs/add/operator/map'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  [x: string]: any;
  isSearchbarActive: boolean
  searchTerm: string = '';
  items$: Observable<Item[]>;
  playing: any;
  booknames: any;
  constructor(public app: App, private auth: AngularFireAuth, private booklist: BookListService,
     private storage: Storage, private toast: ToastController, public navCtrl: NavController) {
      
      this.booknames = []
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
          this.booknames.push({ title: aa.adi , num: aa.key})
        })
      })
  }
  
  ionViewWillLoad(){
    this.isSearchbarActive = false
    this.setFilteredItems();
    this.auth.authState.subscribe(data => {
      if(data && data.email && data.uid){
      this.toast.create({
        message: `Hoşgeldiniz, ${data.email}`,
        duration: 3000 
      }).present()
    }
    })
  }
  openSearch(){
    this.isSearchbarActive = true
  }
  onCancel(){
    this.isSearchbarActive = false
  }
  setFilteredItems() {
    this.booknames = this.filterItems(this.searchTerm);

}
  filterItems(searchTerm){
    console.log(searchTerm)
    
    return this.booknames.filter((item) => {
      return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
  }); 
  }
  public signout(){
    this.storage.remove('session')
    this.auth.auth.signOut();
    this.app.getRootNav().setRoot( WelcomePage );
  }
  public kitapdetay(idd){
    this.navCtrl.push(KitapdetayPage, { id: idd})
  }
  public add(){
    this.navCtrl.push(AddBookPage)
  }
}
