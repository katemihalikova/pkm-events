import {
  headers,
  prepareBody,
  type ApiResponse,
} from "./shared";

export type FEConfig = never;

export async function getFEConfigs() {
  let response = await fetch("https://events.pokemon.com/EventLocator/screenservices/EventLocator/MainFlow/Home/ScreenDataSetGetFEConfigs", {
    method: "POST",
    headers,
    body: prepareBody("NVWtzGmU9TyzDMH7hfV5Sw"),
  });
  let body = await response.json() as ApiResponse<{
    data: {
      List: {
        List: FEConfig[],
      },
    },
  }>;

  if (!response.ok || "exception" in body) throw body;
  if (body.versionInfo.hasModuleVersionChanged) throw new Error("Website version has changed, package update is needed!");
  if (body.versionInfo.hasApiVersionChanged) throw new Error("Endpoint version has changed, package update is needed!");

  return body.data.List.List;
}
