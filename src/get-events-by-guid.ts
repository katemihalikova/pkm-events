import {
  Category,
  headers,
  prepareBody,
  type ApiResponse,
  type Badge,
  type EventTypeName,
  type ISODateTime,
  type Link,
  type ProductTypeValue,
  type SeriesTag,
  type StringifiedNumber,
  type UUID,
} from "./shared";

interface CommonEvent {
  Guid: UUID;
  Activity_type: string;
  Subtype: string;
  Products: {
    List: ProductTypeValue[];
  };
  Start_date: ISODateTime;
  Address: {
    Guid: UUID;
    Name: string;
    Full_address: string;
    Latitude: StringifiedNumber;
    Longitude: StringifiedNumber;
    Timezone: string;
  };
  Status: string;
}

export interface PlaySession {
  Events: CommonEvent & {
    Activity_type: "play_session";
    Subtype: "open_play";
    Status: "pending";
  },
  EventBadge: `/OPPlayerApp/img/OPPlayerApp.${Badge.LEAGUE_SESSION}.png`;
  EventTypeName: "League";
}

export interface LocalEvent {
  Events: CommonEvent & {
    Activity_type: "tournament";
    Subtype: "";
    Name: string;
    Display_id: `${number}-${number}-${number}`; // "25-09-012345",
    Category: Category;
    Details: string;
    Event_website: Link | "";
    // Activity_division_info: {
    //   Juniors: {
    //     Registration_start: ISODateTime | "";
    //     Registration_end: ISODateTime | "";
    //     Admission: string;
    //   };
    //   Seniors: {
    //     Registration_start: ISODateTime | "";
    //     Registration_end: ISODateTime | "";
    //     Admission: string;
    //   };
    //   Masters: {
    //     Registration_start: ISODateTime | "";
    //     Registration_end: ISODateTime | "";
    //     Admission: string;
    //   };
    // };
    Contact_information: {
      Email: string;
      Phone: string;
    };
    Series: {
      Guid: UUID;
      Name: string;
      Tags: {
        List: SeriesTag[];
      };
    };
    Status: "sanctioned";
  } & (
    {
      Third_party_registration_website: Link;
      Registration_start: never;
      Registration_end: never;
      Admission: never;
    } | {
      Third_party_registration_website: never;
      Registration_start: ISODateTime;
      Registration_end: ISODateTime;
      Admission: string;
    }
  ),
  EventBadge: `/OPPlayerApp/img/OPPlayerApp.${Badge}.png`;
  EventTypeName: EventTypeName;
}

export async function getEventsByGuid(guid: UUID | string) {
  let response = await fetch("https://events.pokemon.com/EventLocator/screenservices/EventLocator/MainFlow/LocationDetail/DataActionGetEventsByGUID", {
    method: "POST",
    headers,
    body: prepareBody("jP683rOUBjx4+KnnY4rkjA", { viewName: "MainFlow.LocationDetail", screenDataVariables: { guid } }),
  });

  let body = await response.json() as ApiResponse<{
      data: {
        Result: {
          List: (PlaySession | LocalEvent)[],
        },
      },
    }>;

  if (!response.ok || "exception" in body) throw body;
  if (body.versionInfo.hasModuleVersionChanged) throw new Error("Website version has changed, package update is needed!");
  if (body.versionInfo.hasApiVersionChanged) throw new Error("Endpoint version has changed, package update is needed!");

  return body.data.Result.List;
}
