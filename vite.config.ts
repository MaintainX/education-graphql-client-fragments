import react from "@vitejs/plugin-react";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { defineConfig } from "vite";

const defaultCertFilePath = path.join(
  os.homedir(),
  ".maintainx",
  "localhost.pem",
);
const defaultKeyFilePath = path.join(
  os.homedir(),
  ".maintainx",
  "localhost-key.pem",
);

function getFile(...paths: string[]) {
  for (const p of paths) {
    if (p && fs.existsSync(p)) {
      return fs.readFileSync(p);
    }
  }

  return null;
}

const certFile = getFile(process.env.LOCALHOST_CERTFILE!, defaultCertFilePath);
const keyFile = getFile(process.env.LOCALHOST_KEYFILE!, defaultKeyFilePath);

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 2000,
    https:
      process.env.HTTP === "true" || certFile === null || keyFile === null
        ? undefined
        : {
            cert: certFile,
            key: keyFile,
          },
  },
  plugins: [react()],
});
