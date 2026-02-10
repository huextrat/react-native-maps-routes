type FieldMaskParams = {
  enableEstimatedTime?: boolean;
  enableDistance?: boolean;
  enableLegs?: boolean;
};

export const generateFieldMask = (params: FieldMaskParams): string => {
  const baseFields = ["routes.polyline.encodedPolyline"];

  if (params.enableEstimatedTime) {
    baseFields.push("routes.duration");
  }
  if (params.enableDistance) {
    baseFields.push("routes.distanceMeters");
  }
  if (params.enableLegs) {
    baseFields.push("routes.legs.distanceMeters");
    baseFields.push("routes.legs.duration");
  }

  return baseFields.join(",");
};
