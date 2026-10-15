/**
 * Security headers.
 *
 * Each directive below is here for something the site actually does; if a
 * feature disappears, the directive should go with it, and if one is added it
 * will fail loudly in the console rather than silently.
 *
 *   img-src      album art comes from Spotify's CDN (i.scdn.co); blob: and
 *                data: are three.js reading textures back out of the canvas
 *   script-src   'unsafe-inline' is Next's own bootstrap script, which is not
 *                nonced on a statically exported page. 'wasm-unsafe-eval' is
 *                the Meshopt decoder: the moment a .glb lands in public/models
 *                the room instantiates WebAssembly, and without this the first
 *                Blender export would 404 in a way that looks like a bad model
 *   style-src    'unsafe-inline' is unavoidable: React style props, drei's
 *                <Html>, and the surfaces mounted on the monitor and whiteboard
 *                are all inline styles
 *   worker-src   three.js loaders run their decoders in a blob: worker
 *   connect-src  only our own /api/now-playing
 */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "img-src 'self' data: blob: https://i.scdn.co",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'",
  "worker-src 'self' blob:",
  "connect-src 'self'",
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // nothing here asks for a camera, a microphone or a location
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  // no `preload`: that is a commitment to the HSTS preload list and is the
  // owner's call, not a build setting
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx'],
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

export default nextConfig
