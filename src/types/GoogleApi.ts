export type LegField =
  | "distanceMeters"
  | "duration"
  | "staticDuration"
  | "startLocation"
  | "endLocation";

export type LegStepField =
  | "distanceMeters"
  | "staticDuration"
  | "polyline"
  | "startLocation"
  | "endLocation"
  | "navigationInstruction";

export type GoogleRouteStep = {
  distanceMeters?: number;
  staticDuration?: string;
  polyline?: {
    encodedPolyline: string;
  };
  startLocation?: {
    latLng: {
      latitude: number;
      longitude: number;
    };
  };
  endLocation?: {
    latLng: {
      latitude: number;
      longitude: number;
    };
  };
  navigationInstruction?: {
    maneuver?: string;
    instructions?: string;
  };
};

export type GoogleRouteLeg = {
  distanceMeters?: number;
  duration?: string;
  staticDuration?: string;
  startLocation?: {
    latLng: {
      latitude: number;
      longitude: number;
    };
  };
  endLocation?: {
    latLng: {
      latitude: number;
      longitude: number;
    };
  };
  steps?: GoogleRouteStep[];
};

export type GooglePolylineRoute = {
  polyline: {
    encodedPolyline: string;
  };
  duration?: string;
  distanceMeters?: number;
  legs?: GoogleRouteLeg[];
};

/**
 * Route modifiers supported by Google Routes API computeRoutes.
 * @see https://developers.google.com/maps/documentation/routes/reference/rest/v2/RouteModifiers
 */
export type RouteModifiers = {
  /** Prefer routes that avoid toll roads (DRIVE and TWO_WHEELER only). */
  avoidTolls?: boolean;
  /** Prefer routes that avoid highways (DRIVE and TWO_WHEELER only). */
  avoidHighways?: boolean;
  /** Prefer routes that avoid ferries (DRIVE and TWO_WHEELER only). */
  avoidFerries?: boolean;
  /** Prefer routes that avoid indoor steps (WALK only). */
  avoidIndoor?: boolean;
};

/**
 * Minimal request body for computeRoutes. Use requestBodyOverrides to pass
 * any field (routingPreference, languageCode, polylineQuality, etc.).
 * @see https://developers.google.com/maps/documentation/routes/reference/rest/v2/TopLevel/computeRoutes
 */
export type ComputeRoutesRequestBody = {
  origin?: { location: { latLng: { latitude: number; longitude: number } } };
  destination?: {
    location: { latLng: { latitude: number; longitude: number } };
  };
  intermediates?: Array<{
    location: { latLng: { latitude: number; longitude: number } };
  }>;
  travelMode?: string;
  routeModifiers?: RouteModifiers;
  [key: string]: unknown;
};
