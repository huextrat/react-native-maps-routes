type FieldMaskParams = {
  enableEstimatedTime?: boolean;
};

export const generateFieldMask = (params: FieldMaskParams): string => {
  const baseFields = ["routes.polyline.encodedPolyline"];

  if (params.enableEstimatedTime) {
    baseFields.push("routes.duration");
  }

  return baseFields.join(",");
};
