# ionic-googlemaps-issue-demo

I encounter error on IOS and Android with removing Markers:
- when camera is moving markers are not removed
- when add and remove the same marker (creating new) it will not remove it from the map afterwards.


Using packages:
```json
{
  "@ionic-native/core": "^5.32.0",
  "@ionic-native/google-maps": "^5.5.0",
  "cordova-plugin-googlemaps": "^2.7.1",
  "cordova-plugin-googlemaps-sdk": "github:mapsplugin/cordova-plugin-googlemaps-sdk",
}
```

```bash
node --version
v14.16.0

ionic --version
6.13.1

cordova --version
10.0.0
```

### Steps to reproduce the error
1. Setup you API keys for GoogleMaps - IOS/Android
2. Build and Run application

#### Scenarios:
- multiple click
1. Click Circle button once to place new marker - wait until camera stops
2. Click again Circle button to remove marker from the map (it should remove the marker)
3. Click multiple times to add/remove marker (after few tries markers should not be removed from the map)

- when camera is moving
1. Click Circle button once to place new marker
2. While camera is still moving - click Circle button once again to remove it

### Unexpected behaviour
When there are any animations on the map (like bounced marker, camera moving), and you remove 
marker from the map, then marker is not removed/eresed from the it at all. You can't click it, 
but is still rendered and visible. This problem also affect changing the location of existing marker - update position don't work.

### Expected behaviour
Map should be always refreshed when Marker is removed (also when animation/camera is in palace)
