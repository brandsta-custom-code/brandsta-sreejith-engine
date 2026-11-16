import { createError, getHeader, type H3Event } from 'h3'

// Hex '\x26' is '&' — immune to browser HTML-entity decoding on copy/paste
const AMP = '\x26'

export const escapeXml = (str: string): string =>
  str
    .replace(/&/g, `${AMP}amp;`)
    .replace(/</g, `${AMP}lt;`)
    .replace(/>/g, `${AMP}gt;`)
    .replace(/"/g, `${AMP}quot;`)
    .replace(/'/g, `${AMP}apos;`)

export interface WpCredentials {
  username: string
  password: string
}

const decodeBase64Utf8 = (b64: string): string => {
  const binary = atob(b64)
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
  return new TextDecoder('utf-8').decode(bytes)
}

export const extractWpCredentials = (event: H3Event, allowedUsername: string): WpCredentials => {
  const authHeader = getHeader(event, 'authorization')
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    throw createError({ statusCode: 401, statusMessage: 'Missing Basic Authorization header.' })
  }

  const base64Part = authHeader.slice(6).trim()
  const decoded = decodeBase64Utf8(base64Part)
  const colonIdx = decoded.indexOf(':')

  if (colonIdx === -1) {
    throw createError({ statusCode: 401, statusMessage: 'Malformed authorization credentials.' })
  }

  const username = decoded.slice(0, colonIdx).trim()
  const password = decoded.slice(colonIdx + 1).trim()

  if (!username || !password) {
    throw createError({ statusCode: 401, statusMessage: 'Username and Application Password are required.' })
  }

  if (username.toLowerCase() !== allowedUsername.toLowerCase()) {
    throw createError({
      statusCode: 403,
      statusMessage: `Unauthorized account. Please sign in as ${allowedUsername}.`
    })
  }

  return { username, password }
}

export const callWpXmlRpc = async (siteDomain: string, xmlPayload: string): Promise<string> => {
  const endpoint = `https://${siteDomain}/xmlrpc.php`

  const wpResponse = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      'User-Agent': 'BrandstaSreejithConcierge/1.0'
    },
    body: xmlPayload
  })

  const textResponse = await wpResponse.text()

  if (!wpResponse.ok || textResponse.includes('<name>faultCode</name>')) {
    const faultMatch = textResponse.match(/<name>faultString<\/name>\s*<value>\s*<string>([^<]+)<\/string>/)
    const faultMsg = faultMatch?.[1]?.trim() || 'Request rejected by WordPress XML-RPC.'
    throw createError({ statusCode: 401, statusMessage: faultMsg })
  }

  return textResponse
}