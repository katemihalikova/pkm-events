import { expect, test } from "vitest";
import { getLocations } from "./get-locations";
import { GroupType } from "./shared";

test("getLocations", async () => {
  let list = await getLocations(50, 15, 100, "mi");

  expect(list).toBeInstanceOf(Array);

  for (let event of list) {
    expect(event).keys(
      "Guid",
      "Display_id",
      "Group_type",
      "Display_name",
      "Address",
      "Has_qualifying_activities",
    );
    expect(event.Address).keys(
      "Guid",
      "Name",
      "Full_address",
      "Latitude",
      "Longitude",
      "Timezone",
    );

    expect(event.Guid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    expect(event.Display_id).toMatch(/^(?:L|LE)\d+$/);
    expect(event.Group_type).toBeOneOf(Object.values(GroupType));
    expect(event.Display_name).toBeTypeOf("string");
    expect(event.Address.Guid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    expect(event.Address.Name).toBeTypeOf("string");
    expect(event.Address.Full_address).toBeTypeOf("string");
    expect(event.Address.Latitude).toBeTypeOf("string");
    expect(event.Address.Longitude).toBeTypeOf("string");
    expect(event.Address.Timezone).toBe("");
    expect(event.Has_qualifying_activities).toBeTypeOf("boolean");
  }
});
