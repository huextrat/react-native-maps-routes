export type LegField = "distanceMeters" | "duration";

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
