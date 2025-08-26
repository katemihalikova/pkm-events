import {
  headers,
  prepareBody,
  type ApiResponse,
  type ProductTypeId,
  type ProductTypeValue,
} from "./shared";

export interface ProductType {
  Id: ProductTypeId;
  Label: string;
  Acronym: string;
  Value: ProductTypeValue;
  Order: number;
  Is_Active: boolean;
}

export async function getProductTypes() {
  let response = await fetch("https://events.pokemon.com/EventLocator/screenservices/EventLocator/MainFlow/Filters/ScreenDataSetGetProductTypes", {
    method: "POST",
    headers,
    body: prepareBody("yceo+k8LJh1xuC22OYimxA"),
  });
  let body = await response.json() as ApiResponse<{
      data: {
        List: {
          List: Array<{
            ProductType: ProductType,
            IsEnabled: boolean,
            IsSelected: boolean,
          }>,
        },
      },
    }>;

  if (!response.ok || "exception" in body) throw body;
  if (body.versionInfo.hasModuleVersionChanged) throw new Error("Website version has changed, package update is needed!");
  if (body.versionInfo.hasApiVersionChanged) throw new Error("Endpoint version has changed, package update is needed!");

  return body.data.List.List.map(({ ProductType }) => ProductType).toSorted((a, b) => a.Order - b.Order);
}
