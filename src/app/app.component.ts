import { Component } from '@angular/core';
import {Platform} from "@ionic/angular";
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar) {

    console.log('App Componend');
    this.initApp();
  }

  initApp() {
    this.platform.ready().then(() => {
      console.log('App Initialized OK');
      this.statusBar.styleDefault();
        this.splashScreen.hide();
    });
  }
}
