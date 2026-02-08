/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */

import withPWAInit from "next-pwa";
import "./src/env.js";

const withPWA = withPWAInit({
  dest: "public", // Lokasi file service worker yang digenerate
  disable: process.env.NODE_ENV === "development", // MATI saat coding agar tidak pusing caching
  register: true,
  skipWaiting: true,
});

/** @type {import("next").NextConfig} */
const config = {};

export default withPWA(/** @type {any} */ (config));
