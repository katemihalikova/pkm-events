import { expect, test } from "vitest";
import { getEventTypes } from "./get-event-types";

test("getEventTypes", async () => {
  let list = await getEventTypes();

  expect(list).toBeInstanceOf(Array);

  // if this fails, update enums, then update snapshot
  expect(list).toMatchSnapshot();
});
