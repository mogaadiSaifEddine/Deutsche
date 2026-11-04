import type { NextConfig } from "next";

const config: NextConfig = {
  serverExternalPackages: ["bcryptjs", "@libsql/client"],
};

export default config;
