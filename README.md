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
| `strokeWidth` | `Number` | `6`        | The width of the route line in pixels. |
| `lineCap`     | `String` | `round`    | The line cap style to apply to the open ends of the path. Possible values are `butt`, `round` or `square`. Note: lineCap is not yet supported for GoogleMaps provider on iOS.                                                                                                                                                                                                                                                                                                     |
| `lineJoin`    | `String` | `round`    | The line join style to apply to corners of the path. Possible values are `miter`, `round` or `bevel`.                                                                                                                                                                                                                                                                                                                                                                             |
| `mode`        | `String` | `WALK`     | Which transportation mode to use when calculating route. Allowed values are `"DRIVE"`, `"BICYCLE"`, `"TWO_WHEELER"`, `"WALK"`.                                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                      |
| `routeModifiers` | `RouteModifiers` | `undefined` | Route modifiers (e.g. `{ avoidTolls: true }`, `avoidHighways`, `avoidFerries`, `avoidIndoor`). Typed for discoverability. [API reference](https://developers.google.com/maps/documentation/routes/reference/rest/v2/RouteModifiers). |
| `requestBodyOverrides` | `Partial<ComputeRoutesRequestBody>` | `undefined` | Override or add any field to the request body (e.g. `routingPreference`, `languageCode`). Applied after built-in fields, so it can override `routeModifiers` if needed. [API reference](https://developers.google.com/maps/documentation/routes/reference/rest/v2/TopLevel/computeRoutes). |
| `enableEstimatedTime`        | `Boolean` | `false`     | When true, enables the fetching of estimated travel time (ETA) and triggers the onEstimatedTime callback.                                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                      |
| `enableDistance`      | `Boolean` | `false`    | When true, enables the fetching of the distance of the route in meters and triggers the onDistance callback.                                                                                                                                                                                                                                                                                                                                                                      |     |
| `legFields`           | `LegField[]` | `undefined` | Optional array of leg-level fields to request. Available values: `"distanceMeters"`, `"duration"`, `"staticDuration"`, `"startLocation"`, `"endLocation"`. Only the specified fields are included in the field mask, keeping API costs minimal. Triggers the `onLegs` callback when provided.                                                                                                                                                                                                  |     |
| `legStepFields`       | `LegStepField[]` | `undefined` | Optional array of step-level fields to request within each leg. Available values: `"distanceMeters"`, `"staticDuration"`, `"polyline"`, `"startLocation"`, `"endLocation"`, `"navigationInstruction"`. Triggers the `onLegs` callback when provided.                                                                                                                                                                                                                    |     |
### Types

`LatLng` is from `react-native-maps`. This package also exports:

- `RouteModifiers` – for the `routeModifiers` prop (`avoidTolls`, `avoidHighways`, `avoidFerries`, `avoidIndoor`)
- `ComputeRoutesRequestBody` – for typing `requestBodyOverrides`
- `LegField`, `LegStepField`, `GoogleRouteLeg`, `GoogleRouteStep`, `GooglePolylineRoute`, `TravelMode`

```ts
import { MapViewRoute } from "react-native-maps-routes";
import type { RouteModifiers, ComputeRoutesRequestBody } from "react-native-maps-routes";
```

### Events/Callbacks

| Event Name | Returns                                   | Notes                                                              |
|------------|-------------------------------------------|--------------------------------------------------------------------|
| `onReady`  | `LatLng[]`                                | Callback that is called when the routing has successfully finished. |
| `onError`  | `any`                                     | Callback that is called in case the routing has failed.            |
| `onEstimatedTime`  | `number`                          | Callback called with estimated time (ETA) as a milliseconds if enabled.  |
| `onLegs`          | `GoogleRouteLeg[]`                        | Callback called with route legs when `legFields` or `legStepFields` is provided. |
| `onDistance`      | `number`                                  | Callback called with distance of the route in meters if enabled.        |
