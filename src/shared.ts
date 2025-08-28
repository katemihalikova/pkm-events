export const headers = {
  "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
  "content-type": "application/json; charset=UTF-8",
  "accept": "application/json",
  "x-csrftoken": "T6C+9iB49TLra4jEsMeSckDMNhQ=",
  "cookie": `reese84=3:vAg34R+gb039MiBXIEPnvg==:B4R8Zwn6diWxY1PAl7jwutddmQ7ew4J5q45IA5WtkOjxx8Yk1yDM0lYm7PkrEiz+Dkw92HqBT71W83tYlAycc0iMN3mbJcHO+TyZqhD8cqNPCZ/HEjd3989+2+XkY3JQNiemBic4gzAQda72KExNoeUiBu1SLY8bIcJpJi0kfJRhTNerpy9+OSPQMrEIxO/uzOZIy6bGdiE+sz42SVl8x9jmQspfQ53QzLfjsTEzdfUXkvarfBQsx3hgQVYmvuZ+QstaSr/NDMCCJgk+/vGYq/gC6T/Sp0hH/ttnTjAeIusfkG5Pjhf0uwV50BPy7ayVWqV5cgfovv18sqMjTIGRZguUgdD+6FKWGhDuLhI0ZCoEj21JC0k67QUSm/7eMAVp0xJ1NcGT8fEzaOzBfTWft6BVUfrbmOh8bj8Gf3wHMnPks7RNxQNniVYVVmZ9AvDq4KkEhakNPWj4bbMVA6+4WQ==:K4YZSdYofdGirMvZIPiXBcxehvfNP2yyns4vq9h9Bno=`,
  "Referer": "https://events.pokemon.com/EventLocator/Home?locale=en-US&range=100&iskm=false",
};

export function prepareBody(apiVersion: string, data?: { viewName?: string, clientVariables?: object, screenDataVariables?: object }) {
  return JSON.stringify({
    versionInfo: {
      moduleVersion: "PJWDQkleVESGoyz+ZdlXcw",
      apiVersion,
    },
    viewName: data?.viewName ?? "MainFlow.Home",
    screenData: { variables: { StartIndex: 0, MaxRecords: 5000, ...data?.screenDataVariables } },
    inputParameters: { StartIndex: 0, MaxRecords: 5000 },
    clientVariables: data?.clientVariables,
  });
}

export type ApiResponse<T extends object> = (T & {
  versionInfo: {
    hasModuleVersionChanged: boolean;
    hasApiVersionChanged: boolean;
  };
}) | {
  exception: object;
};

export type ISODate = `${number}-${number}-${number}` & { __flavor: "ISO date" };
export type ISODateTime = `${number}-${number}-${number}T${number}:${number}:${number}${"" | "Z" | `${"+" | "-"}${number}:${number}`}` & { __flavor: "ISO date-time" };
export type Link = `http${"" | "s"}://${string}` & { __flavor: "link" };
export type StringifiedNumber = `${number}` & { __flavor: "number" };
export type UUID = `${string}-${string}-${string}-${string}-${string}` & { __flavor: "uuid" };

export enum EventTypeId {
  WORLD_CHAMPIONSHIPS = 3,
  INTERNATIONAL_CHAMPIONSHIPS = 4,
  REGIONAL_CHAMPIONSHIPS = 5,
  PLAY_LAB = 6,
  ONLINE_TOURNAMENT = 7,

  PRERELEASE = 8,
  LEAGUE_CUP = 9,
  LEAGUE_CHALLENGE = 10,
  LEAGUE_SESSION = 11,
  FRIENDLY_TOURNAMENT = 16,
}

export enum EventTypeName {
  PRERELEASE = "Prerelease",
  LEAGUE_CUP = "Cup",
  LEAGUE_CHALLENGE = "Challenge",
  LEAGUE_SESSION = "League",
  FRIENDLY_TOURNAMENT = "Friendly Tournament",
}

export enum EventSubtypeId {
  COMPETITIVE_TOURNAMENT = 1,
  FRIENDLY_TOURNAMENT = 2,
}

export enum Badge {
  WORLD_CHAMPIONSHIPS = "WorldsBadge",
  INTERNATIONAL_CHAMPIONSHIPS = "InternationalsBadge",
  REGIONAL_CHAMPIONSHIPS = "RegionalsBadge",
  PLAY_LAB = "PlayLabBadge",
  ONLINE_TOURNAMENT = "PlayPokemonBadge",

  PRERELEASE = "PrereleaseBadge",
  LEAGUE_CUP = "LeagueCupBadge",
  LEAGUE_CHALLENGE = "LeaguechallengeBadge",
  LEAGUE_SESSION = "PlayPokemonBadge",
  FRIENDLY_TOURNAMENT = "PlayPokemonBadge",
}

export enum StatusId {
  ANNOUNCED = "2",
  OPEN = "3",
}

export enum ProductTypeId {
  TCG = 1,
  VG = 2,
  PGO = 3,
}

export enum ProductTypeValue {
  TCG = "tcg",
  VG = "vg",
  PGO = "pgo",
}

export enum Category {
  TCG_STANDARD = "tcg_std",
  TCG_EXPANDED = "tcg_exp",
  TCG_LIMITED = "tcg_lim",
  TCG_LIMITED_DITTO = "tcg_lim_ditto",
  TCG_UNLIMITED = "tcg_unl",
  TCG_GYM_LEADER_CHALLENGE = "tcg_glc",
  TCG_OTHER_FORMATS = "tcg_other",

  VG_STANDARD = "vg_mod",
  VG_SINGLE_BATTLE = "vg_fun_sin",
  VG_MULTI_BATTLE = "vg_fun_multi",
  VG_OTHER_FORMATS = "vg_fun_other",

  PGO_STANDARD = "pgo_std",
}

export enum GroupType {
  LEAGUE = "league",
  LARGE_EVENT = "large_event",
}

export enum SeriesTag {
  CHAMPIONSHIP_SERIES = "championship_series",
  LEAGUE_CHALLENGE = "league_challenge",
  LEAGUE_CUP = "league_cup",
  PRERELEASE = "prerelease",
}

let warned = new Set();
export function warnOnce(warning: string) {
  if (warned.has(warning)) return;
  warned.add(warning);
  console.warn(warning);
}
