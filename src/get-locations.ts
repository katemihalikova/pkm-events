import {
  headers,
  prepareBody,
  warnOnce,
  type ApiResponse,
  type GroupType,
  type StringifiedNumber,
  type UUID,
} from "./shared";

export interface Location {
  Guid: UUID;
  Display_id: `${"L" | "LE"}${number}`;
  Group_type: GroupType;
  Display_name: string;
  Address: {
    Guid: UUID;
    Name: string;
    Full_address: string;
    Latitude: StringifiedNumber;
    Longitude: StringifiedNumber;
    Timezone: "";
  },
  Has_qualifying_activities: boolean;
}

export async function getLocations(latitude: number, longitude: number, range: 5 | 10 | 15 | 25 | 50 | 100, unit: "km" | "mi") {
  let response = await fetch("https://events.pokemon.com/EventLocator/screenservices/EventLocator/MainFlow/Home/DataActionGetLocations", {
    method: "POST",
    headers,
    body: prepareBody("RhHgee2LqYvHUvBIv_IYdw", {
      clientVariables: {
        Latitude: latitude,
        Longitude: longitude,
        Range: range,
        isKm: unit === "km",
      },
    }),
  });
  let body = await response.json() as ApiResponse<{
      data: {
        Locations: {
          List: Location[],
        },
      },
    }>;

  if (!response.ok || "exception" in body) throw body;
  if (body.versionInfo.hasModuleVersionChanged) warnOnce("Website version has changed, package update might be needed!");
  if (body.versionInfo.hasApiVersionChanged) warnOnce("Endpoint version for getLocations has changed, package update might be needed!");

  return body.data.Locations.List;
}
