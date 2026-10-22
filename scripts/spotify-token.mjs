/**
 * One-time Spotify setup: prints the refresh token /api/now-playing needs.
 *
 *   1. developer.spotify.com/dashboard -> Create app. Add the redirect URI
 *      below exactly (Spotify rejects "localhost"; it must be 127.0.0.1).
 *   2. Put SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env.local.
 *   3. npm run spotify:token, approve in the browser, and copy the printed
 *      token into .env.local and Vercel as SPOTIFY_REFRESH_TOKEN.
 *
 * Nothing is written to disk: the token is only printed, so it never ends up
 * in a file that could be committed by mistake.
 */
import { createServer } from 'node:http'
import { execFile } from 'node:child_process'
import { randomBytes } from 'node:crypto'

const PORT = 8888
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`
const SCOPES = 'user-read-currently-playing user-read-recently-played'

try {
  process.loadEnvFile('.env.local')
} catch {
  // fine: the variables may already be in the environment
}

const id = process.env.SPOTIFY_CLIENT_ID
const secret = process.env.SPOTIFY_CLIENT_SECRET
if (!id || !secret) {
  console.error('Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env.local first.')
  process.exit(1)
}

// guards the callback against a request this script did not start
const state = randomBytes(16).toString('hex')

const authorize = new URL('https://accounts.spotify.com/authorize')
authorize.search = new URLSearchParams({
  response_type: 'code',
  client_id: id,
  scope: SCOPES,
  redirect_uri: REDIRECT_URI,
  state,
}).toString()

async function exchange(code) {
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'authorization_code', code, redirect_uri: REDIRECT_URI }),
  })
  const json = await res.json()
  if (!res.ok || !json.refresh_token) throw new Error(json.error_description ?? json.error ?? res.statusText)
  return json.refresh_token
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', REDIRECT_URI)
  if (url.pathname !== '/callback') {
    res.writeHead(404).end()
    return
  }

  const finish = (status, message) => {
    res.writeHead(status, { 'Content-Type': 'text/plain' }).end(message)
    server.close()
  }

  if (url.searchParams.get('state') !== state) return finish(400, 'State mismatch. Run the script again.')
  const code = url.searchParams.get('code')
  if (!code) return finish(400, `Spotify said: ${url.searchParams.get('error') ?? 'no code'}`)

  try {
    const token = await exchange(code)
    console.log('\nSPOTIFY_REFRESH_TOKEN=' + token + '\n')
    console.log('Add that line to .env.local and to Vercel -> Settings -> Environment Variables.')
    finish(200, 'Done. The token is in your terminal; you can close this tab.')
  } catch (error) {
    console.error('Token exchange failed:', error.message)
    finish(500, 'Token exchange failed. See the terminal.')
  }
})

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Waiting on ${REDIRECT_URI}`)
  console.log('If the browser does not open, visit:\n' + authorize)
  execFile(process.platform === 'darwin' ? 'open' : 'xdg-open', [authorize.toString()], () => {})
})
