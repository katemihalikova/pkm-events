import { expect, test } from "vitest";
import { getPremierEvents } from "./get-premier-events";
import { Badge, EventTypeId, StatusId } from "./shared";

test("getPremierEvents", async () => {
  let list = await getPremierEvents();

  expect(list).toBeInstanceOf(Array);

  for (let event of list) {
    expect(event).keys(
      "EventGUID",
      "EventTypeId",
      "EventType",
      "StatusId",
      "Status",
      "Name",
      "VenueName",
      "StreetAddress",
      "SecondaryAddress",
      "City",
      "State",
      "PostalCode",
      "Country",
      "StartDate",
      "EndDate",
      "RegistrationDateStartDate",
      "DocumentationSubmissionDate",
      "Cost",
      "Description",
      "RegistrationLink",
      "Latitude",
      "Longitude",
      "Badge",
      "SpectatorRegistrationLink",
      "RegistrationDateEndDate",
      "SpectatorRegistrationStartDate",
      "SpectatorRegistrationEndDate",
    );

    expect(event.EventGUID).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    expect(event.EventTypeId).toBeOneOf(Object.values(EventTypeId).map(String));
    expect(event.StatusId).toBeOneOf(Object.values(StatusId));
    expect(event.Name).toBeTypeOf("string");
    expect(event.VenueName).toBeTypeOf("string");
    expect(event.StreetAddress).toBeTypeOf("string");
    expect(event.SecondaryAddress).toBeTypeOf("string");
    expect(event.City).toBeTypeOf("string");
    expect(event.State).toBeTypeOf("string");
    expect(event.PostalCode).toBeTypeOf("string");
    expect(event.Country).toBeTypeOf("string");
    expect(event.StartDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(event.EndDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(event.RegistrationDateStartDate).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})?$/);
    expect(event.DocumentationSubmissionDate).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})?$/);
    expect(event.Cost).toBeTypeOf("string");
    expect(event.Description).toBeTypeOf("string");
    expect(event.RegistrationLink).toMatch(/^https?:\/\/|^$/);
    expect(event.Latitude).toBeTypeOf("string");
    expect(event.Longitude).toBeTypeOf("string");
    expect(event.Badge).toBeTypeOf("string");
    if (!event.Badge.startsWith("data:")) {
      expect(event.Badge).toBeOneOf(Object.values(Badge));
    }
    expect(event.SpectatorRegistrationLink).toMatch(/^https?:\/\/|^$/);
    expect(event.RegistrationDateEndDate).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})?$/);
    expect(event.SpectatorRegistrationStartDate).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})?$/);
    expect(event.SpectatorRegistrationEndDate).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})?$/);
  }
});
