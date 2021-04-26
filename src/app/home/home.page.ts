import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  GoogleMapsAnimation, LatLng
} from '@ionic-native/google-maps';
import { Component } from '@angular/core';
import {Platform} from '@ionic/angular';
import {interval, Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  map: GoogleMap;
  marker: Marker;
  mapRefreshInterval: Observable<number>;

  markers: any[];
  mapMarkers: Marker[];

  position = {
    lat: 43.0741004,
    lng: -89.3800802
  };

  constructor(private platform: Platform) {
    this.marker = null;
    this.mapMarkers = [];
    this.mapRefreshInterval = interval( 10 * 1000);

    this.platform.ready().then(() => {
      this.loadMap();
    });

    this.markers = [{
      color: 'blue',
      lat: 43.0741004,
      lng: -89.3800802,
      icon: {
        url: './nofile',
        size: {
          width: 40,
          height: 40,
        },
      }
    },{
      color: 'yellow',
      lat: 43.0741204,
      lng: -89.3801002
    }];
  }

  renderMarkers() {
    for( const marker of this.markers ) {
      console.log(marker);
      const mk: Marker = this.map.addMarkerSync({
        title: 'Ionic',
        icon: marker.icon ? marker.icon : marker.color,
        animation: null,
        position: {
          lat: marker.lat,
          lng: marker.lng
        }
      });

      mk.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        alert('clicked');
      });

      this.mapMarkers.push(mk);
    }
  }

  moveMarkers() {
    for(const marker of this.mapMarkers) {
      const pos = marker.getPosition();
      marker.setPosition({
        lat: pos.lat + 0.00010,
        lng: pos.lng + 0.00010
      });
    }
  }

  ionViewDidLoad() {
    console.log('Home ionViewDidLoad ');
  }

  onMapTest() {
    if (this.marker) {
      //this.marker.remove();
      this.position.lng += 0.00010;
      this.position.lat += 0.00010;

      this.marker.setAnimation(null);
      this.marker.setDisableAutoPan(true);
      this.marker.setPosition( this.position );
      //this.marker = null;

      return;
    }

    this.marker = this.map.addMarkerSync({
      icon: '#4A89F3',
      position: this.position,
      animation: null,
    });

    this.map.animateCamera({
      target: this.position,
      tilt: 30,
    });

    this.position.lng += 0.00010;
    this.position.lat += 0.00010;
  }

  loadMap() {
    console.log('Starting Map');

    this.mapRefreshInterval.subscribe(tik => {
      console.log('Clock TikTak', tik);
      this.moveMarkers();
    });

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
    this.renderMarkers();
  }
}

