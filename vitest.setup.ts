import failOnConsole from "vitest-fail-on-console";

if (process.env.FAIL_ON_CONSOLE) {
  failOnConsole();
}
