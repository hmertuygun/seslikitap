import { Component } from '@angular/core';
import { AboutPage } from '../about/about';
import { KitaplikPage } from '../kitaplik/kitaplik';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';
import { Vibration } from '@ionic-native/vibration';
import { BookListService } from '../../services/booklist/book.service';
import { Media, MediaObject } from '@ionic-native/media';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = KitaplikPage;
  file : MediaObject;
  filep: any;
  userid: any;
  playing: any;
  logged: any;
  played: boolean;
  last: any;
  addedid: any;
  dk: any;
  saniye: any;
  duration: any;

  constructor(public navCtrl:NavController, private vibration: Vibration, private auth: AngularFireAuth, private booklist: BookListService, private storage: Storage, private media: Media){
    let say = 0
    setInterval(()=>{
      if(this.played == true){
      this.file.getCurrentPosition().then((position) => {
        let uitem = {
          user: this.userid,
          book: this.playing,
          time: position
        }
        let userr = this.booklist.addUser(uitem)
      })
    }
    }, 10000)

    setInterval(()=>{
      this.storage.get('playingnowyeah').then((val) => {
        this.playing = val
      })
      this.file.getCurrentPosition().then((position) => {
        this.duration = parseInt(position)
        let ii = this.duration/60
        if(ii%1 == 0){
          this.dk = this.duration/60
          if(this.saniye == 60){
             this.saniye == 0
            }
        }else{
          this.saniye = this.duration%60
        }
      });
    }, 1000)
  }
  ionViewDidLoad(){
    this.auth.authState.subscribe(data => {
      if(data && data.email && data.uid){
        this.userid = data.uid
        this.logged = true
    }else{
      this.logged= false
    }
    })
    this.storage.get('playingnow').then((val) => {
      this.file =  this.media.create(val[2])
      this.played = false
      this.playing = val[1]
    })
  }
  kitapdurdur(){
    this.file.pause()
    this.played = false
    console.log(this.played)
    this.vibration.vibrate(1);
  }
  kitapbaslat(){
    this.file.play()
    this.played = true
    console.log(this.played)
    this.vibration.vibrate(1);
  }

  }
  