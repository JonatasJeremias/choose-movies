import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';

// https://www.djamware.com/post/5b74e54f80aca74669894413/ionic-4-and-angular-6-tutorial-firebase-realtime-crud-mobile-app
const config = {
  apiKey: 'AIzaSyBqY-XjWFglTx7dBPCNz6DTeXSH8Isx7jk',
  authDomain: 'movies-web-scraping.firebaseapp.com',
  databaseURL: 'https://movies-web-scraping.firebaseio.com',
  projectId: 'movies-web-scraping',
  storageBucket: 'movies-web-scraping.appspot.com',
  messagingSenderId: '220004732249'
};
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    (window as any).global = window;
    (window as any).global.Buffer = (window as any).global.Buffer || require('buffer').Buffer;
    firebase.initializeApp(config);
  }
}

declare var require: any;
