import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NativeAudio } from '@ionic-native/native-audio';
import { Media, MediaObject } from '@ionic-native/media';
import { Vibration } from '@ionic-native/vibration';

import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { KitaplikPage } from '../pages/kitaplik/kitaplik';
import { AddBookPage } from '../pages/add-book/add-book';
import { KitapdetayPage } from '../pages/kitapdetay/kitapdetay';
import { DinlePage } from '../pages/dinle/dinle';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BookListService } from '../services/booklist/book.service';

const config = {
  apiKey: "AIzaSyDOMb--rK2ReVFPSq7mZDu-Q6YcOZUUTGc",
  authDomain: "seslikitap-30cb4.firebaseapp.com",
  databaseURL: "https://seslikitap-30cb4.firebaseio.com",
  projectId: "seslikitap-30cb4",
  storageBucket: "seslikitap-30cb4.appspot.com",
  messagingSenderId: "245301111542"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    WelcomePage,
    LoginPage,
    AddBookPage,
    RegisterPage,
    DinlePage,
    ContactPage,
    KitapdetayPage,
    KitaplikPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    KitapdetayPage,
    HomePage,
    KitaplikPage,
    WelcomePage,
    DinlePage,
    AddBookPage,
    LoginPage,
    RegisterPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Media,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BookListService,
    NativeAudio,
    Vibration
  ]
})
export class AppModule {}
