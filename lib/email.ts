import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

const resend = resendApiKey ? new Resend(resendApiKey) : null;

const DASHBOARD_URL =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/+$/, "") + "/" || "http://localhost:3000/";

export async function sendChallengeReminderEmail(email: string, dayNumber: number) {
  if (!resend) {
    console.warn("Resend client not configured. Skipping email send.");
    return;
  }

  const subject = "You missed today's AI PM challenge";

  const text = [
    "Hey there,",
    "",
    `This is a friendly reminder to complete day ${dayNumber} of your AI PM Challenge.`,
    "",
    `You can jump back into your dashboard here: ${DASHBOARD_URL}`,
    "",
    "Keep going — consistency is where the real learning happens.",
    "",
    "AI PM Challenge",
  ].join("\n");

  const html = `
    <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #111827;">
      <p>Hey there,</p>
      <p>This is a friendly reminder to complete day <strong>${dayNumber}</strong> of your AI PM Challenge.</p>
      <p>
        You can jump back into your dashboard here:<br />
        <a href="${DASHBOARD_URL}" style="color: #2563eb; text-decoration: underline;">Back to dashboard</a>
      </p>
      <p>Keep going — consistency is where the real learning happens.</p>
      <p style="margin-top: 1.5rem;">AI PM Challenge</p>
    </div>
  `;

  await resend.emails.send({
    from: "AI PM Challenge <no-reply@yourdomain.test>",
    to: email,
    subject,
    text,
    html,
  });
}

