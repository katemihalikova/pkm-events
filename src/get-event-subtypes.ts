import {
  headers,
  prepareBody,
  warnOnce,
  type ApiResponse,
  type EventSubtypeId,
} from "./shared";

export interface EventSubtype {
  Id: EventSubtypeId;
  Label: string;
  Order: number;
  Is_Active: boolean;
}

export async function getEventSubtypes() {
  let response = await fetch("https://events.pokemon.com/EventLocator/screenservices/EventLocator/MainFlow/Filters/ScreenDataSetGetEventSubTypes", {
    method: "POST",
    headers,
    body: prepareBody("mpnCvRfdv3r+owJ7zRG2bg"),
  });
  let body = await response.json() as ApiResponse<{
      data: {
        List: {
          List: Array<{
            EventSubType: EventSubtype,
            IsSelected: boolean,
          }>,
        },
      },
    }>;

  if (!response.ok || "exception" in body) throw body;
  if (body.versionInfo.hasModuleVersionChanged) warnOnce("Website version has changed, package update might be needed!");
  if (body.versionInfo.hasApiVersionChanged) warnOnce("Endpoint version for getEventSubtypes has changed, package update might be needed!");

  return body.data.List.List.map(({ EventSubType }) => EventSubType).toSorted((a, b) => a.Order - b.Order);
}
