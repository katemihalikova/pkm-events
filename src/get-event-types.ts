import {
  headers,
  prepareBody,
  type ApiResponse,
  type Badge,
  type EventTypeId,
} from "./shared";

export interface EventType {
  Id: EventTypeId;
  Label: string;
  Value: string;
  Order: number;
  Is_Active: boolean;
  PlayPageRecord: boolean;
  EventLocatorRecord: boolean;
  Bagde: Badge;
}

async function getLocalEventTypes() {
  let response = await fetch("https://events.pokemon.com/EventLocator/screenservices/EventLocator/MainFlow/Filters/ScreenDataSetGetEventTypes", {
    method: "POST",
    headers,
    body: prepareBody("0rVhUSd1khNYaxeHmvMrcg"),
  });
  let body = await response.json() as ApiResponse<{
      data: {
        List: {
          List: Array<{
            EventType: EventType,
            IsEnabled: boolean,
            IsSelected: boolean,
          }>,
        },
      },
    }>;

  if (!response.ok || "exception" in body) throw body;
  if (body.versionInfo.hasModuleVersionChanged) throw new Error("Website version has changed, package update is needed!");
  if (body.versionInfo.hasApiVersionChanged) throw new Error("Endpoint version has changed, package update is needed!");

  return body.data.List.List.map(({ EventType }) => EventType).toSorted((a, b) => a.Order - b.Order);
}

async function getPremierEventTypes() {
  let response = await fetch("https://events.pokemon.com/EventLocator/screenservices/EventLocator/MainFlow/Home/ScreenDataSetGetEventTypes", {
    method: "POST",
    headers,
    body: prepareBody("vDwi9WWbABFjeIUvUUUB3A"),
  });
  let body = await response.json() as ApiResponse<{
      data: {
        List: {
          List: Array<{
            EventType: EventType,
            IsSelected: boolean,
          }>,
        },
      },
    }>;

  if (!response.ok || "exception" in body) throw body;
  if (body.versionInfo.hasModuleVersionChanged) throw new Error("Website version has changed, package update is needed!");
  if (body.versionInfo.hasApiVersionChanged) throw new Error("Endpoint version has changed, package update is needed!");

  return body.data.List.List.map(({ EventType }) => EventType).toSorted((a, b) => a.Order - b.Order);
}

export async function getEventTypes() {
  let [localList, premierList] = await Promise.all([getLocalEventTypes(), getPremierEventTypes()]);
  return [...localList, ...premierList].toSorted((a, b) => a.Order - b.Order);
}