// biome-ignore lint/style/useImportType: <to comment>
import React, { useEffect, useState } from "react";
import {
  type LatLng,
  type LineCapType,
  type LineJoinType,
  Polyline,
} from "react-native-maps";
import type { TravelMode } from "src/types/TravelMode";
import type { GooglePolylineRoute } from "../types/GoogleApi";
import { decodeRoutesPolyline } from "../utils/decoder";
import { formatDuration } from "../utils/formatDuration";
import { generateFieldMask } from "../utils/generateFieldMask";

const DEFAULT_STROKE_COLOR = "#000";
const DEFAULT_STROKE_WIDTH = 6;
const DEFAULT_LINE_JOIN: LineJoinType = "round";
const DEFAULT_LINE_CAP: LineCapType = "round";
const DEFAULT_TRAVEL_MODE: TravelMode = "WALK";
const API_ENDPOINT =
  "https://routes.googleapis.com/directions/v2:computeRoutes";

type Props = {
  origin: LatLng;
  destination: LatLng;
  waypoints?: LatLng[];
  apiKey: string;
  strokeColor?: string;
  strokeWidth?: number;
  onReady?: (coordinates: LatLng[]) => void;
  onError?: (error: Error) => void;
  onEstimatedTime?: (time: number) => void;
  enableEstimatedTime?: boolean;
  onDistance?: (distance: number) => void;
  enableDistance?: boolean;
  onLegs?: (legs: { distanceMeters: number; duration: string }[]) => void;
  enableLegs?: boolean;
  mode?: TravelMode;
  lineJoin?: LineJoinType;
  lineCap?: LineCapType;
};

export const MapViewRoute: React.FC<Props> = ({
  origin,
  destination,
  waypoints = [],
  apiKey,
  strokeColor = DEFAULT_STROKE_COLOR,
  strokeWidth = DEFAULT_STROKE_WIDTH,
  onReady,
  onError,
  onEstimatedTime,
  enableEstimatedTime = false,
  onDistance,
  enableDistance = false,
  onLegs,
  enableLegs = false,
  mode = DEFAULT_TRAVEL_MODE,
  lineJoin = DEFAULT_LINE_JOIN,
  lineCap = DEFAULT_LINE_CAP,
}) => {
  const [coordinates, setCoordinates] = useState<LatLng[]>([]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <to comment>
  useEffect(() => {
    fetchRoute();
  }, [origin, destination]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <to comment>
  useEffect(() => {
    if (coordinates.length) {
      onReady?.(coordinates);
    }
  }, [coordinates]);

  const fetchRoute = () => {
    fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": generateFieldMask({
          enableEstimatedTime: enableEstimatedTime,
          enableDistance: enableDistance,
          enableLegs: enableLegs,
        }),
      },
      body: JSON.stringify({
        origin: {
          location: {
            latLng: origin,
          },
        },
        destination: {
          location: {
            latLng: destination,
          },
        },
        ...(waypoints?.length > 0
          ? {
              intermediates: waypoints.map((latLng) => ({
                location: { latLng },
              })),
            }
          : {}),
        travelMode: mode,
      }),
    })
      .then((response: Response) => response.json())
      .then((json: { routes: GooglePolylineRoute[]; error: Error }) => {
        if (json.error) {
          throw json.error;
        }
        const route = json.routes[0] as GooglePolylineRoute;
        setCoordinates(decodeRoutesPolyline(route));

        if (enableEstimatedTime) {
          const durationString = route.duration ?? "0s";
          const formattedTime = formatDuration(durationString);
          onEstimatedTime?.(formattedTime);
        }

        if (enableDistance) {
          const distance = route.distanceMeters ?? 0;
          onDistance?.(distance);
        }

        if (enableLegs && route.legs) {
          onLegs?.(route.legs);
        }
      })
      .catch((error) => {
        onError?.(error);
      });
  };

  return (
    <Polyline
      coordinates={coordinates}
      strokeColor={strokeColor}
      strokeWidth={strokeWidth}
      lineJoin={lineJoin}
      lineCap={lineCap}
    />
  );
};
