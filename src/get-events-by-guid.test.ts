import { expect, test } from "vitest";
import { getEventsByGuid, type LocalEvent, type PlaySession } from "./get-events-by-guid";
import { Badge, Category, EventTypeName, ProductTypeValue, SeriesTag } from "./shared";

const isLocalEvent = (event: LocalEvent | PlaySession): event is LocalEvent => event.Events.Activity_type === "tournament";
const isPlaySession = (event: LocalEvent | PlaySession): event is PlaySession => event.Events.Activity_type === "play_session";

test("getEventsByGuid", async () => {
  let list = (await Promise.all([
    getEventsByGuid("8f9e0286-8a98-7fdb-7e7a-95111dba8b74"),
    getEventsByGuid("29517050-ea63-4cc6-dddb-749e645ebbc6"),
    getEventsByGuid("078b1a6f-9778-3606-c7d6-e8596314b200"),
    getEventsByGuid("63e18e1e-235a-6452-8d1b-3e9dcf9b5617"),
    getEventsByGuid("2b220275-e15b-4a89-427f-389efca6794f"),
  ])).flat();

  expect(list).toBeInstanceOf(Array);

  for (let event of list) {
    expect(event).keys(
      "Events",
      "EventBadge",
      "EventTypeName",
      "SpecialEventDescription",
      "SpecialEventIcon",
    );
    expect(event.Events).keys(
      "Guid",
      "Activity_type",
      "Subtype",
      "Name",
      "Display_id",
      "Products",
      "Category",
      "Start_date",
      "Address",
      "Event_website",
      "Registration_start",
      "Registration_end",
      "Details",
      "Third_party_registration_website",
      "Contact_information",
      "Admission",
      "Activity_division_info",
      "Series",
      "Status",
    );

    if (isPlaySession(event)) {

      expect(event.Events.Guid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
      expect(event.Events.Activity_type).toBe("play_session");
      expect(event.Events.Subtype).toBe("open_play");
      expect((event as any).Events.Name).toBe("");
      expect((event as any).Events.Display_id).toBe("");
      expect(event.Events.Products).keys("List");
      expect(event.Events.Products.List).not.toHaveLength(0);
      for (let value of event.Events.Products.List) {
        expect(value).toBeOneOf(Object.values(ProductTypeValue));
      }
      expect((event as any).Events.Category).toBe("");
      expect(event.Events.Start_date).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})?$/);
      expect(event.Events.Address).keys("Guid", "Name", "Full_address", "Latitude", "Longitude", "Timezone");
      expect(event.Events.Address.Guid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
      expect(event.Events.Address.Name).toBeTypeOf("string");
      expect(event.Events.Address.Name).not.toBe("");
      expect(event.Events.Address.Full_address).toBeTypeOf("string");
      expect(event.Events.Address.Latitude).toMatch(/^[+-]?\d+(?:.\d*)?$/);
      expect(event.Events.Address.Longitude).toMatch(/^[+-]?\d+(?:.\d*)?$/);
      expect(event.Events.Address.Timezone).toBeTypeOf("string");
      expect(event.Events.Address.Timezone).not.toBe("");
      expect((event as any).Events.Details).toBe("");
      expect((event as any).Events.Event_website).toBe("");
      expect((event as any).Events.Third_party_registration_website).toBe("");
      expect((event as any).Events.Registration_start).toBe("");
      expect((event as any).Events.Registration_end).toBe("");
      expect((event as any).Events.Admission).toBe("");
      expect((event as any).Events.Activity_division_info).keys("Juniors", "Seniors", "Masters");
      expect((event as any).Events.Activity_division_info.Juniors).keys("Registration_start", "Registration_end", "Admission");
      expect((event as any).Events.Activity_division_info.Juniors.Registration_start).toBe("");
      expect((event as any).Events.Activity_division_info.Juniors.Registration_end).toBe("");
      expect((event as any).Events.Activity_division_info.Juniors.Admission).toBe("");
      expect((event as any).Events.Activity_division_info.Seniors).keys("Registration_start", "Registration_end", "Admission");
      expect((event as any).Events.Activity_division_info.Seniors.Registration_start).toBe("");
      expect((event as any).Events.Activity_division_info.Seniors.Registration_end).toBe("");
      expect((event as any).Events.Activity_division_info.Seniors.Admission).toBe("");
      expect((event as any).Events.Activity_division_info.Masters).keys("Registration_start", "Registration_end", "Admission");
      expect((event as any).Events.Activity_division_info.Masters.Registration_start).toBe("");
      expect((event as any).Events.Activity_division_info.Masters.Registration_end).toBe("");
      expect((event as any).Events.Activity_division_info.Masters.Admission).toBe("");
      expect((event as any).Events.Contact_information).keys("Email", "Phone");
      expect((event as any).Events.Contact_information.Email).toBe("");
      expect((event as any).Events.Contact_information.Phone).toBe("");
      expect((event as any).Events.Series).keys("Guid", "Name", "Tags");
      expect((event as any).Events.Series.Guid).toBe("");
      expect((event as any).Events.Series.Name).toBe("");
      expect((event as any).Events.Series.Tags).keys("List", "EmptyListItem");
      expect((event as any).Events.Series.Tags.List).toHaveLength(0);
      expect(event.Events.Status).toBe("pending");
      expect(event.EventBadge).toBe(`/OPPlayerApp/img/OPPlayerApp.${Badge.LEAGUE_SESSION}.png`);
      expect(event.EventTypeName).toBe(EventTypeName.LEAGUE_SESSION);
      expect((event as any).SpecialEventDescription).toBe("");
      expect((event as any).SpecialEventIcon).toBe("");

    } else if (isLocalEvent(event)) {

      expect(event.Events.Guid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
      expect(event.Events.Activity_type).toBe("tournament");
      expect(event.Events.Subtype).toBe("");
      expect(event.Events.Name).toBeTypeOf("string");
      expect(event.Events.Display_id).toMatch(/^\d{2}-\d{2}-\d{6}$/);
      expect(event.Events.Products).keys("List");
      expect(event.Events.Products.List).not.toHaveLength(0);
      for (let value of event.Events.Products.List) {
        expect(value).toBeOneOf(Object.values(ProductTypeValue));
      }
      expect(event.Events.Category).toBeOneOf(Object.values(Category));
      expect(event.Events.Start_date).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})?$/);
      expect(event.Events.Address).keys("Guid", "Name", "Full_address", "Latitude", "Longitude", "Timezone");
      expect(event.Events.Address.Guid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
      expect(event.Events.Address.Name).toBeTypeOf("string");
      expect(event.Events.Address.Name).not.toBe("");
      expect(event.Events.Address.Full_address).toBeTypeOf("string");
      expect(event.Events.Address.Latitude).toMatch(/^[+-]?\d+(?:.\d*)?$/);
      expect(event.Events.Address.Longitude).toMatch(/^[+-]?\d+(?:.\d*)?$/);
      expect(event.Events.Address.Timezone).toBeTypeOf("string");
      expect(event.Events.Address.Timezone).not.toBe("");
      expect(event.Events.Details).toBeTypeOf("string");
      expect(event.Events.Event_website).toMatch(/^https?:\/\/|^$/);
      if (event.Events.Third_party_registration_website) {
        expect(event.Events.Third_party_registration_website).toMatch(/^https?:\/\//);
        expect(event.Events.Registration_start).toBe("");
        expect(event.Events.Registration_end).toBe("");
        expect(event.Events.Admission).toBe("");
      } else  {
        expect(event.Events.Third_party_registration_website).toBe("");
        expect(event.Events.Registration_start).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})?$/);
        expect(event.Events.Registration_end).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})?$/);
        expect(event.Events.Admission).toBeTypeOf("string");
      }
      expect((event as any).Events.Activity_division_info).keys("Juniors", "Seniors", "Masters");
      expect((event as any).Events.Activity_division_info.Juniors).keys("Registration_start", "Registration_end", "Admission");
      expect((event as any).Events.Activity_division_info.Juniors.Registration_start).toBe(""); // toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})?$|^$/);
      expect((event as any).Events.Activity_division_info.Juniors.Registration_end).toBe(""); // toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})?$|^$/);
      expect((event as any).Events.Activity_division_info.Juniors.Admission).toBe(""); // toBeTypeOf("string");
      expect((event as any).Events.Activity_division_info.Seniors).keys("Registration_start", "Registration_end", "Admission");
      expect((event as any).Events.Activity_division_info.Seniors.Registration_start).toBe(""); // toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})?$|^$/);
      expect((event as any).Events.Activity_division_info.Seniors.Registration_end).toBe(""); // toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})?$|^$/);
      expect((event as any).Events.Activity_division_info.Seniors.Admission).toBe(""); // toBeTypeOf("string");
      expect((event as any).Events.Activity_division_info.Masters).keys("Registration_start", "Registration_end", "Admission");
      expect((event as any).Events.Activity_division_info.Masters.Registration_start).toBe(""); // toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})?$|^$/);
      expect((event as any).Events.Activity_division_info.Masters.Registration_end).toBe(""); // toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})?$|^$/);
      expect((event as any).Events.Activity_division_info.Masters.Admission).toBe(""); // toBeTypeOf("string");
      expect(event.Events.Contact_information).keys("Email", "Phone");
      expect(event.Events.Contact_information.Email).toBeTypeOf("string");
      expect(event.Events.Contact_information.Phone).toBeTypeOf("string");
      expect(event.Events.Series).keys("Guid", "Name", "Tags");
      if (event.EventTypeName === "Friendly Tournament") {
        expect(event.Events.Series.Guid).toBe("");
        expect(event.Events.Series.Name).toBe("");
        expect(event.Events.Series.Tags.List).toHaveLength(0);
      } else {
        expect(event.Events.Series.Guid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
        expect(event.Events.Series.Name).toBeTypeOf("string");
        expect(event.Events.Series.Tags.List).not.toHaveLength(0);
        for (let value of event.Events.Series.Tags.List) {
          expect(value).toBeOneOf(Object.values(SeriesTag));
        }
      }
      expect(event.Events.Status).toBe("sanctioned");
      expect(event.EventBadge).toBeOneOf(Object.values(Badge).map(badge => `/OPPlayerApp/img/OPPlayerApp.${badge}.png`));
      expect(event.EventTypeName).toBeOneOf(Object.values(EventTypeName));
      expect((event as any).SpecialEventDescription).toBe("");
      expect((event as any).SpecialEventIcon).toBe("");

    } else {
      throw `Unknown Activity_type: ${(event as any).Events.Activity_type}`;
    }
  }
});

test("getEventsByGuid - large events", async () => {
  let list = (await Promise.all([
    getEventsByGuid("e403a7d6-731c-4035-aed5-109d16fec83f"),
    getEventsByGuid("2a9cfa48-d8d2-44e2-9652-6282d9b4a9ce"),
    getEventsByGuid("af732474-b76c-4876-af41-0a29b81d5876"),
  ])).flat();

  expect(list).toBeInstanceOf(Array);
  expect(list).toHaveLength(0);
});
