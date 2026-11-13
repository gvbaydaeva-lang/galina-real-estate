export type FloorPlanVariant = "compact" | "family" | "corner" | "terrace" | "linear" | "master";

export type FloorPlanCard = {
  variant: FloorPlanVariant;
  label: string;
  area: string;
  planVariant: string;
};

export type FloorPlanGalleryData = {
  apartments: ReadonlyArray<{ type: string; area: string; price: string }>;
  plans: ReadonlyArray<FloorPlanCard>;
};

const demo = (type: string, area: string, price: string) => ({ type, area, price: `${price} · пример` });

export const krasnodarFloorPlanGalleries: Readonly<Record<string, FloorPlanGalleryData>> = {
  "krasnodar-park-pobedy-3": {
    apartments: [demo("1-комн.", "39–43 м²", "от 6,8 млн ₽"), demo("2-комн.", "57–64 м²", "от 9,4 млн ₽"), demo("3-комн.", "78–86 м²", "от 12,7 млн ₽")],
    plans: [
      { variant: "compact", label: "1-комн.", area: "40,2 м²", planVariant: "park-pobedy-compact" },
      { variant: "family", label: "2-комн.", area: "61,8 м²", planVariant: "park-pobedy-family" },
      { variant: "corner", label: "3-комн.", area: "82,4 м²", planVariant: "park-pobedy-corner" },
    ],
  },
  "krasnodar-grade": {
    apartments: [demo("Студия", "25–29 м²", "от 4,9 млн ₽"), demo("2-комн.", "55–62 м²", "от 8,7 млн ₽"), demo("3-комн.", "75–91 м²", "от 11,9 млн ₽")],
    plans: [
      { variant: "linear", label: "Студия", area: "27,5 м²", planVariant: "grade-linear" },
      { variant: "terrace", label: "2-комн.", area: "58,6 м²", planVariant: "grade-terrace" },
      { variant: "master", label: "3-комн.", area: "86,1 м²", planVariant: "grade-master" },
    ],
  },
  "krasnodar-reeds": {
    apartments: [demo("1-комн.", "36–41 м²", "от 6,2 млн ₽"), demo("2-комн.", "59–68 м²", "от 9,8 млн ₽"), demo("3-комн.", "82–96 м²", "от 13,6 млн ₽")],
    plans: [
      { variant: "terrace", label: "1-комн.", area: "38,7 м²", planVariant: "reeds-terrace" },
      { variant: "corner", label: "2-комн.", area: "64,2 м²", planVariant: "reeds-corner" },
      { variant: "master", label: "3-комн.", area: "91,3 м²", planVariant: "reeds-master" },
    ],
  },
  "krasnodar-record-2": {
    apartments: [demo("Студия", "24–28 м²", "от 4,5 млн ₽"), demo("2-комн.", "52–60 м²", "от 8,1 млн ₽"), demo("4-комн.", "101–118 м²", "от 14,8 млн ₽")],
    plans: [
      { variant: "linear", label: "Студия", area: "26,1 м²", planVariant: "record-linear" },
      { variant: "family", label: "2-комн.", area: "56,9 м²", planVariant: "record-family" },
      { variant: "master", label: "4-комн.", area: "108,5 м²", planVariant: "record-master" },
    ],
  },
  "krasnodar-samolet-7": {
    apartments: [demo("1-комн.", "35–40 м²", "от 6,0 млн ₽"), demo("2-комн.", "54–66 м²", "от 8,9 млн ₽"), demo("3-комн.", "79–94 м²", "от 12,4 млн ₽")],
    plans: [
      { variant: "compact", label: "1-комн.", area: "37,4 м²", planVariant: "samolet-compact" },
      { variant: "terrace", label: "2-комн.", area: "62,7 м²", planVariant: "samolet-terrace" },
      { variant: "corner", label: "3-комн.", area: "88,9 м²", planVariant: "samolet-corner" },
    ],
  },
  "krasnodar-dogma-park": {
    apartments: [demo("Студия", "26–31 м²", "от 4,8 млн ₽"), demo("2-комн.", "58–70 м²", "от 9,2 млн ₽"), demo("3-комн.", "84–99 м²", "от 13,1 млн ₽")],
    plans: [
      { variant: "linear", label: "Студия", area: "29,3 м²", planVariant: "dogma-linear" },
      { variant: "family", label: "2-комн.", area: "66,5 м²", planVariant: "dogma-family" },
      { variant: "master", label: "3-комн.", area: "93,8 м²", planVariant: "dogma-master" },
    ],
  },
};

export function getKrasnodarFloorPlanGallery(propertyId: string) {
  return krasnodarFloorPlanGalleries[propertyId];
}
