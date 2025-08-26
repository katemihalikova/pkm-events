import { expect, test } from "vitest";
import { getProductTypes } from "./get-product-types";

test("getProductTypes", async () => {
  let list = await getProductTypes();

  expect(list).toBeInstanceOf(Array);

  // if this fails, update enums, then update snapshot
  expect(list).toMatchSnapshot();
});
