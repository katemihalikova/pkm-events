import {
  headers,
  prepareBody,
  warnOnce,
  type ApiResponse,
  type Badge,
  type EventTypeId,
  type ISODate,
  type ISODateTime,
  type Link,
  type StatusId,
  type StringifiedNumber,
  type UUID,
} from "./shared";

export interface PremierEvent {
  EventGUID: UUID;
  EventTypeId: `${EventTypeId}`;
  // EventType: string;
  StatusId: StatusId;
  // Status: string;
  Name: string;
  Description: string;
  StartDate: ISODate;
  EndDate: ISODate;
  Cost: string;
  VenueName: string;
  StreetAddress: string;
  SecondaryAddress: string;
  City: string;
  State: string;
  PostalCode: string;
  Country: string;
  Latitude: StringifiedNumber;
  Longitude: StringifiedNumber;
  Badge: Badge;
  RegistrationLink: Link | "";
  RegistrationDateStartDate: ISODateTime;
  RegistrationDateEndDate: ISODateTime;
  SpectatorRegistrationLink: Link | "";
  SpectatorRegistrationStartDate: ISODateTime;
  SpectatorRegistrationEndDate: ISODateTime;
  DocumentationSubmissionDate: ISODateTime;
}

export async function getPremierEvents() {
  let response = await fetch("https://events.pokemon.com/EventLocator/screenservices/EventLocator/MainFlow/Home/DataActionGetEventsByStartDate", {
    method: "POST",
    headers,
    body: prepareBody("rccbIIlT1khVIIJqBCBt3w"),
  });
  let body = await response.json() as ApiResponse<{
      data: {
        List: {
          List: PremierEvent[],
        },
      },
    }>;

  if (!response.ok || "exception" in body) throw body;
  if (body.versionInfo.hasModuleVersionChanged) warnOnce("Website version has changed, package update might be needed!");
  if (body.versionInfo.hasApiVersionChanged) warnOnce("Endpoint version for getPremierEvents has changed, package update might be needed!");

  return body.data.List.List;
}
