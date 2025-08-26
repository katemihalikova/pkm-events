import { expect, test } from "vitest";
import { getEventSubtypes } from "./get-event-subtypes";

test("getEventSubtypes", async () => {
  let list = await getEventSubtypes();

  expect(list).toBeInstanceOf(Array);

  // if this fails, update enums, then update snapshot
  expect(list).toMatchSnapshot();
});
