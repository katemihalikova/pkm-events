import { expect, test } from "vitest";
import { getFEConfigs } from "./get-fe-configs";

test("getFEConfigs", async () => {
  let list = await getFEConfigs();

  expect(list).toBeInstanceOf(Array);

  // FE Configs are expected to change to be empty sometimes. I have seen then non-empty only before Worlds 2025 so far.
  // if this fails, create an interface for response, then remove this assertion
  expect(list).toHaveLength(0);
});
