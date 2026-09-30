const path = require("node:path");
const fs = require("node:fs");

module.exports = {
  makers: [
    {
      name: "@electron-forge/maker-zip",
      platforms: ["win32"],
    },
  ],
  hooks: {
    packageAfterCopy: async (_forgeConfig, buildPath) => {
      const source = path.join(__dirname, "assets");
      const destination = path.join(buildPath, "assets");

      fs.cpSync(source, destination, {
        recursive: true,
      });
    },
  },
};
