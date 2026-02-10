export type GoogleRouteLeg = {
  distanceMeters?: number;
  duration?: string;
};

export type GooglePolylineRoute = {
  polyline: {
    encodedPolyline: string;
  };
  duration?: string;
  distanceMeters?: number;
  legs?: GoogleRouteLeg[];
};
