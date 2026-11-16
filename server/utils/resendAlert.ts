import { getHeader, getRequestIP, type H3Event } from 'h3'

interface ResendAttachment {
  filename: string
  content: string // Base64 string
}

interface ResendDispatchInput {
  subject: string
  html: string
  attachments?: ResendAttachment[]
}

export const formatIstTimestamp = (date = new Date()): string =>
  new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }).format(date) + ' IST'

export const getClientTelemetry = (event: H3Event) => {
  const ip =
    getHeader(event, 'x-vercel-forwarded-for') ||
    getRequestIP(event, { xForwardedFor: true }) ||
    'Local / Unknown IP'
  const city = getHeader(event, 'x-vercel-ip-city') || ''
  const country = getHeader(event, 'x-vercel-ip-country') || ''
  const userAgent = getHeader(event, 'user-agent') || 'Unknown Browser'
  const location = [city, country].filter(Boolean).join(', ') || 'Direct / Local Network'

  return { ip, location, userAgent, timestamp: formatIstTimestamp() }
}

export const sendResendDispatch = async (input: ResendDispatchInput): Promise<void> => {
  const config = useRuntimeConfig()
  if (!config.resendApiKey) return

  const recipients = String(config.resendToEmails || '')
    .split(',')
    .map((e) => e.trim())
    .filter(Boolean)

  if (!recipients.length) return

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: config.resendFromEmail,
        to: recipients,
        subject: input.subject,
        html: input.html,
        ...(input.attachments?.length ? { attachments: input.attachments } : {})
      })
    })
  } catch (err) {
    console.error('[Resend Dispatch Error]:', err)
  }
}

export const runInBackground = (event: H3Event, promise: Promise<unknown>) => {
  if (typeof event.waitUntil === 'function') {
    event.waitUntil(promise)
  } else {
    promise.catch((err) => console.error('[Background Task Error]:', err))
  }
}