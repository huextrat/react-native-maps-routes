type FieldMaskParams = {
  enableEstimatedTime?: boolean;
  enableDistance?: boolean;
};

export const generateFieldMask = (params: FieldMaskParams): string => {
  const baseFields = ["routes.polyline.encodedPolyline"];

  if (params.enableEstimatedTime) {
    baseFields.push("routes.duration");
  }
  if (params.enableDistance) {
    baseFields.push("routes.distanceMeters");
  }

  return baseFields.join(",");
};
