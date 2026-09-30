import { mkdir, writeFile } from "node:fs/promises";

const cjsDir = "./dist/cjs";

await mkdir(cjsDir, { recursive: true });

await writeFile(
  `${cjsDir}/package.json`,
  JSON.stringify(
    {
      type: "commonjs",
    },
    null,
    2,
  ),
);

console.log("CJS package.json created");
