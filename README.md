# react-native-maps-routes

[![npm Version](https://img.shields.io/npm/v/react-native-maps-routes.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-maps-routes)
[![License](https://img.shields.io/npm/l/react-native-maps-routes.svg?style=for-the-badge)](LICENSE.md)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/huextrat/react-native-maps-routes.svg?style=for-the-badge)](https://github.com/huextrat/react-native-maps-routes)

Component for the [`react-native-maps`](https://github.com/airbnb/react-native-maps/) library that lets you draw a route between two coordinates.
This library uses the [Google Maps Routes API](https://developers.google.com/maps/documentation/routes/) to compute the route.

If you still want to use the [Google Maps Directions API](https://developers.google.com/maps/documentation/directions/), please use the following library: [react-native-maps-directions](https://github.com/bramus/react-native-maps-directions/tree/master).

## Installation

```sh
yarn add react-native-maps-routes
or
npm install react-native-maps-routes
```

## Basic Usage

Import `MapViewRoute` and render it as a child of a `MapView` component. The mandatory `MapViewRoute` props are:

- `origin`: The origin location to start routing from
- `destination`: The destination location to start routing to
- `apiKey`: Your Google Maps Routes API Key _(request one [here](https://developers.google.com/maps/documentation/routes/get-api-key); if you're using an existing Google Maps API Key make sure you've enabled the Google Maps Routes API for that key using the [Google API Console](https://console.developers.google.com/apis/))_.

```js
import {MapViewRoute} from 'react-native-maps-routes';

const origin = { latitude: 37.332280, longitude: -122.010980 };
const destination = { latitude: 37.423199, longitude: -122.084068 };
const GOOGLE_MAPS_APIKEY = '…';

<MapView initialRegion={…}>
  <MapViewRoute
    origin={origin}
    destination={destination}
    apiKey={GOOGLE_MAPS_APIKEY}
  />
</MapView>
```

## Component API

### Props
| Prop          | Type     | Default    | Note                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
|---------------|----------|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `origin`      | `LatLng` | (Required) | The origin location to start routing from.                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `destination` | `LatLng` | (Required) | The destination location to start routing to.                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `waypoints`   | `LatLng[]` | `undefined` | Optional array of intermediate waypoints (up to 25) to pass through between origin and destination. Each waypoint is a `{ latitude, longitude }` object.                                                                                                                                                                                                                                                                                                                          |
| `apiKey`      | `String` | (Required) | Your Google Maps API Key _(request one [here](https://developers.google.com/maps/documentation/routes/get-api-key); if you're using an existing Google Maps API Key make sure you've enabled the Google Maps Routes API for that key using the [Google API Console](https://console.developers.google.com/apis/))_.                                                                                                                                                               |
| `strokeColor` | `String` | `#000`     | The stroke colors to use for the path (iOS only). Must be the same length as `coordinates`.                                                                                                                                                                                                                                                                                                                                                                                       |
| `strokeWidth` | `Number` | `6`        | The limiting value that helps avoid spikes at junctions between connected line segments. The miter limit helps you avoid spikes in paths that use the `miter` `lineJoin` style. If the ratio of the miter length—that is, the diagonal length of the miter join—to the line thickness exceeds the miter limit, the joint is converted to a bevel join. The default miter limit is 10, which results in the conversion of miters whose angle at the joint is less than 11 degrees. |
| `lineCap`     | `String` | `round`    | The line cap style to apply to the open ends of the path. Possible values are `butt`, `round` or `square`. Note: lineCap is not yet supported for GoogleMaps provider on iOS.                                                                                                                                                                                                                                                                                                     |
| `lineJoin`    | `String` | `round`    | The line join style to apply to corners of the path. Possible values are `miter`, `round` or `bevel`.                                                                                                                                                                                                                                                                                                                                                                             |
| `mode`        | `String` | `WALK`     | Which transportation mode to use when calculating route. Allowed values are `"DRIVE"`, `"BICYCLE"`, `"TWO_WHEELER"`, `"WALK"`.                                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                      |
| `enableEstimatedTime`        | `Boolean` | `false`     | When true, enables the fetching of estimated travel time (ETA) and triggers the onEstimatedTime callback.                                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                      |
| `enableDistance`      | `Boolean` | `false`    | When true, enables the fetching of the distance of the route in meters and triggers the onDistance callback.                                                                                                                                                                                                                                                                                                                                                                      |     |
### Types

```
type LatLng {
  latitude: Number,
  longitude: Number,
}
```

### Events/Callbacks

| Event Name | Returns                                   | Notes                                                              |
|------------|-------------------------------------------|--------------------------------------------------------------------|
| `onReady`  | `LatLng[]`                                | Callback that is called when the routing has succesfully finished. |
| `onError`  | `any`                                     | Callback that is called in case the routing has failed.            |
| `onEstimatedTime`  | `number`                          | Callback called with estimated time (ETA) as a milliseconds if enabled.  |
| `onDistance`      | `number`                                  | Callback called with distance of the route in meters if enabled.        |
