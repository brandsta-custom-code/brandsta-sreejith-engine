// server/api/verify.post.ts
import { defineEventHandler, readBody } from 'h3'
import { callWpXmlRpc, escapeXml, extractWpCredentials } from '../utils/wpXmlRpc'
import { getClientTelemetry, sendResendDispatch } from '../utils/resendAlert'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody<{ mode?: 'interactive' | 'silent' }>(event).catch(() => null)
  const isInteractive = body?.mode !== 'silent'
  const telemetry = getClientTelemetry(event)

  try {
    const { username, password } = extractWpCredentials(event, config.wpAllowedUsername)

    const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
<methodCall>
  <methodName>wp.getUsersBlogs</methodName>
  <params>
    <param><value><string>${escapeXml(username)}</string></value></param>
    <param><value><string>${escapeXml(password)}</string></value></param>
  </params>
</methodCall>`

    await callWpXmlRpc(config.wpSiteDomain, xmlPayload)

    if (isInteractive && config.enableLoginAlerts) {
      await sendResendDispatch({
        subject: '✅ Digital Concierge Unlocked — Sree Jith Travel',
        html: `
          <div style="font-family:Lato,Arial,sans-serif;background:#030712;color:#e2e8f0;padding:24px;border-radius:12px;border:1px solid #1e293b;">
            <h2 style="margin:0 0 8px;color:#ffffff;">Digital Concierge Unlocked</h2>
            <p style="margin:0 0 16px;color:#94a3b8;font-size:14px;">A manual sign-in succeeded on <strong>sreejith.brandsta.cc</strong>.</p>
            <table style="font-size:13px;color:#cbd5e1;line-height:1.7;">
              <tr><td style="padding-right:14px;color:#64748b;">Account:</td><td><strong>@${username}</strong></td></tr>
              <tr><td style="padding-right:14px;color:#64748b;">Time:</td><td>${telemetry.timestamp}</td></tr>
              <tr><td style="padding-right:14px;color:#64748b;">IP / Location:</td><td>${telemetry.ip} (${telemetry.location})</td></tr>
              <tr><td style="padding-right:14px;color:#64748b;">Device:</td><td>${telemetry.userAgent}</td></tr>
            </table>
          </div>
        `
      }).catch((dispatchErr) => console.error('[Resend Success Alert Error]:', dispatchErr))
    }

    return { success: true, username }
  } catch (err: any) {
    if (isInteractive && config.enableLoginAlerts) {
      await sendResendDispatch({
        subject: '⚠️ Failed Login Attempt — Digital Concierge | Sree Jith Travel',
        html: `
          <div style="font-family:Lato,Arial,sans-serif;background:#030712;color:#e2e8f0;padding:24px;border-radius:12px;border:1px solid #7f1d1d;">
            <h2 style="margin:0 0 8px;color:#f87171;">Failed Concierge Sign-In</h2>
            <p style="margin:0 0 16px;color:#94a3b8;font-size:14px;">Reason: ${err?.statusMessage || err?.message || 'Invalid credentials'}</p>
            <p style="margin:0;font-size:13px;color:#cbd5e1;">Time: ${telemetry.timestamp}<br/>IP: ${telemetry.ip} (${telemetry.location})<br/>Device: ${telemetry.userAgent}</p>
          </div>
        `
      }).catch((dispatchErr) => console.error('[Resend Failure Alert Error]:', dispatchErr))
    }
    throw err
  }
})