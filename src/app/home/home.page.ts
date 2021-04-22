import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  GoogleMapsAnimation
} from '@ionic-native/google-maps';
import { Component } from '@angular/core';
import {Platform} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  map: GoogleMap;
  marker: Marker;

  constructor(private platform: Platform) {
    this.marker = null;
    this.platform.ready().then(() => {
      this.loadMap();
    });
  }

  ionViewDidLoad() {
    console.log('Home ionViewDidLoad ');
  }

  onMapTest() {
    if (this.marker) {
      this.marker.remove();
      this.marker = null;
      return;
    }

    this.marker = this.map.addMarkerSync({
      icon: '#4A89F3',
      position: {
        lat: 43.0741004,
        lng: -89.3800802
      },
      animation: GoogleMapsAnimation.BOUNCE,
    });

    this.map.animateCamera({
      target: {
        lat: 43.0741004,
        lng: -89.3800802
      },
      tilt: 30,
    });

  }

  loadMap() {
    console.log('Starting Map');

    // This code is necessary for browser
    /*Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': '(your api key for `https://`)',
      'API_KEY_FOR_BROWSER_DEBUG': '(your api key for `http://`)'
    });*/

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    let marker: Marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: 'blue',
      //animation: 'DROP',
      position: {
        lat: 43.0741904,
        lng: -89.3809802
      }
    });

    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });
  }
}

