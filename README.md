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

Import `MapViewRoute` and render it as a child of a `MapView` component. The mandatory `MapViewDirections` props are:

- `origin`: The origin location to start routing from
- `destination`: The destination location to start routing to
- `apiKey`: Your Google Maps Routes API Key _(request one [here](https://developers.google.com/maps/documentation/routes/get-api-key); if you're using an existing Google Maps API Key make sure you've enabled the Google Maps Routes API for that key using the [Google API Console](https://console.developers.google.com/apis/))_.

```js
import MapViewRoute from 'react-native-maps-routes';

const origin = { latitude: 37.332280, longitude: -122.010980 };
const destination = { latitude: 37.423199, longitude: -122.084068 };
const GOOGLE_MAPS_APIKEY = '…';

<MapView initialRegion={…}>
  <MapViewDirections
    origin={origin}
    destination={destination}
    apiKey={GOOGLE_MAPS_APIKEY}
  />
</MapView>
```
