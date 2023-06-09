import React, { useEffect, useState } from "react";

import { LatLng, LineCapType, LineJoinType, Polyline } from "react-native-maps";
import type { GooglePolylineRoute } from "../types/GoogleApi";
import { decodeRoutesPolyline } from "../utils/decoder";

type Props = {
  origin: LatLng;
  destination: LatLng;
  apiKey: string;
  strokeColor?: string;
  strokeWidth?: number;
  onStart?: (route: { origin: string; destination: string }) => void;
  onReady?: (coordinates: LatLng[]) => void;
  onError?: (error: any) => void;
  mode?: "DRIVE" | "BICYCLE" | "TWO_WHEELER" | "WALK";
  lineJoin?: LineJoinType;
  lineCap?: LineCapType;
};

export const MapViewRoute: React.FC<Props> = (props) => {
  const [coordinates, setCoordinates] = useState<LatLng[]>([]);

  useEffect(() => {
    fetchRoute();
  }, [props.origin, props.destination]);

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
        "X-Goog-FieldMask": "routes.polyline.encodedPolyline",
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
      .then((response: any) => response.json())
      .then((json: any) => {
        if (json.error) {
          throw json.error;
        }
        const route = json.routes[0] as GooglePolylineRoute;
        setCoordinates(decodeRoutesPolyline(route));
      })
      .catch((error: any) => {
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
