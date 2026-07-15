import {NextResponse} from 'next/server';

const BREVO_API_URL = 'https://api.brevo.com/v3/contacts';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_FUNGO_LIST_ID;
  if (!apiKey || !listId) {
    return NextResponse.json(
      {ok: false, error: 'email_not_configured'},
      {status: 503}
    );
  }

  let body: {email?: unknown};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ok: false, error: 'bad_request'}, {status: 400});
  }

  const email = String(body.email ?? '').trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ok: false, error: 'invalid_email'}, {status: 400});
  }

  try {
    const res = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'content-type': 'application/json',
        accept: 'application/json'
      },
      body: JSON.stringify({
        email,
        listIds: [Number(listId)],
        updateEnabled: true
      })
    });

    if (!res.ok) {
      console.error('brevo subscribe failed', res.status, await res.text());
      return NextResponse.json({ok: false, error: 'send_failed'}, {status: 502});
    }
  } catch (err) {
    console.error('brevo subscribe failed', err);
    return NextResponse.json({ok: false, error: 'send_failed'}, {status: 502});
  }

  return NextResponse.json({ok: true});
}
