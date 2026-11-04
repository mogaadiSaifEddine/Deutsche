import type { NextConfig } from "next";

const config: NextConfig = {
  serverExternalPackages: ["bcryptjs", "mysql2"],
};

export default config;
