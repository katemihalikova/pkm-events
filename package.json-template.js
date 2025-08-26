import pkg from "./package.json" assert { type: "json" };

let version = process.env.VERSION;
if (!version) throw new Error("No VERSION env var specified");

console.log(JSON.stringify({
  name: pkg.name,
  version,
  type: "module",
  dependencies: pkg.dependencies,
  peerDependencies: pkg.peerDependencies,
  peerDependenciesMeta: pkg.peerDependenciesMeta,
  main: "pkm-events.js",
  module: "pkm-events.js",
  types: "index.d.ts",
}, undefined, 2));
