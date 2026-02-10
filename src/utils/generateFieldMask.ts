import type { LegField, LegStepField } from "../types/GoogleApi";

type FieldMaskParams = {
  enableEstimatedTime?: boolean;
  enableDistance?: boolean;
  legFields?: LegField[];
  legStepFields?: LegStepField[];
};

export const generateFieldMask = (params: FieldMaskParams): string => {
  const baseFields = ["routes.polyline.encodedPolyline"];

  if (params.enableEstimatedTime) {
    baseFields.push("routes.duration");
  }
  if (params.enableDistance) {
    baseFields.push("routes.distanceMeters");
  }
  if (params.legFields?.length) {
    for (const field of params.legFields) {
      baseFields.push(`routes.legs.${field}`);
    }
  }
  if (params.legStepFields?.length) {
    for (const field of params.legStepFields) {
      baseFields.push(`routes.legs.steps.${field}`);
    }
  }

  return baseFields.join(",");
};
