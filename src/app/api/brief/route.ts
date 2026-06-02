import {NextResponse} from 'next/server';
import {Resend} from 'resend';

const FROM = process.env.RESEND_FROM ?? 'Reelificio <noreply@reelificio.com>';
const TO = process.env.RESEND_TO ?? 'hello@reelificio.com';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {ok: false, error: 'email_not_configured'},
      {status: 503}
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ok: false, error: 'bad_request'}, {status: 400});
  }

  const name = String(form.get('name') ?? '').trim();
  const company = String(form.get('company') ?? '').trim();
  const email = String(form.get('handle') ?? '').trim();
  const message = String(form.get('message') ?? '').trim();
  // Honeypot: if hidden field is filled, silently drop.
  const honey = String(form.get('website') ?? '').trim();

  if (honey) return NextResponse.json({ok: true});
  if (!name || !company || !message) {
    return NextResponse.json(
      {ok: false, error: 'missing_fields'},
      {status: 400}
    );
  }
  if (message.length > 5000 || name.length > 200 || company.length > 200) {
    return NextResponse.json({ok: false, error: 'too_long'}, {status: 400});
  }

  const resend = new Resend(apiKey);

  const subject = `Nuovo brief — ${company} (${name})`;
  const text = [
    `Da: ${name} <${company}>`,
    email ? `Email: ${email}` : null,
    '',
    message
  ]
    .filter(Boolean)
    .join('\n');

  try {
    await resend.emails.send({
      from: FROM,
      to: TO,
      subject,
      text,
      replyTo: undefined
    });
  } catch (err) {
    console.error('resend send failed', err);
    return NextResponse.json(
      {ok: false, error: 'send_failed'},
      {status: 502}
    );
  }

  return NextResponse.json({ok: true});
}
