// biome-ignore lint/style/useImportType: <to comment>
import React, { useEffect, useState } from "react";
import {
  type LatLng,
  type LineCapType,
  type LineJoinType,
  Polyline,
} from "react-native-maps";
import type { GooglePolylineRoute } from "../types/GoogleApi";
import { decodeRoutesPolyline } from "../utils/decoder";
import { formatDuration } from "../utils/formatDuration";
import { generateFieldMask } from "../utils/generateFieldMask";

type Props = {
  origin: LatLng;
  destination: LatLng;
  apiKey: string;
  strokeColor?: string;
  strokeWidth?: number;
  onStart?: (route: { origin: string; destination: string }) => void;
  onReady?: (coordinates: LatLng[]) => void;
  onError?: (error: Error) => void;
  onEstimatedTime?: (time: number) => void;
  enableEstimatedTime?: boolean;
  onDistance?: (distance: number) => void;
  enableDistance?: boolean;
  mode?: "DRIVE" | "BICYCLE" | "TWO_WHEELER" | "WALK";
  lineJoin?: LineJoinType;
  lineCap?: LineCapType;
};

export const MapViewRoute: React.FC<Props> = (props) => {
  const [coordinates, setCoordinates] = useState<LatLng[]>([]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <to comment>
  useEffect(() => {
    fetchRoute();
  }, [props.origin, props.destination]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <to comment>
  useEffect(() => {
    if (coordinates.length) {
      props.onReady?.(coordinates);
    }
  }, [coordinates]);

  const fetchRoute = () => {
    fetch("https://routes.googleapis.com/directions/v2:computeRoutes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": props.apiKey,
        "X-Goog-FieldMask": generateFieldMask({
          enableEstimatedTime: props.enableEstimatedTime,
          enableDistance: props.enableDistance,
        }),
      },
      body: JSON.stringify({
        origin: {
          location: {
            latLng: props.origin,
          },
        },
        destination: {
          location: {
            latLng: props.destination,
          },
        },
        travelMode: props.mode || "WALK",
      }),
    })
      .then((response: Response) => response.json())
      .then((json: { routes: GooglePolylineRoute[]; error: Error }) => {
        if (json.error) {
          throw json.error;
        }
        const route = json.routes[0] as GooglePolylineRoute;
        setCoordinates(decodeRoutesPolyline(route));

        if (props.enableEstimatedTime) {
          const durationString = route.duration ?? "0s";
          const formattedTime = formatDuration(durationString);
          props.onEstimatedTime?.(formattedTime);
        }

        if (props.enableDistance) {
          const distance = route.distanceMeters ?? 0;
          props.onDistance?.(distance);
        }
      })
      .catch((error) => {
        props.onError?.(error);
      });
  };

  return (
    <Polyline
      coordinates={coordinates}
      strokeColor={props.strokeColor ?? "#000"}
      strokeWidth={props.strokeWidth ?? 6}
      lineJoin={props.lineJoin ?? "round"}
      lineCap={props.lineCap ?? "round"}
    />
  );
};
