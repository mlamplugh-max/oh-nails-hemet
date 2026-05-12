interface Env {
  RESEND_API_KEY?: string;
  BOOKING_EMAIL?: string;
  FROM_EMAIL?: string;
}

type Payload = {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  date?: string;
  time?: string;
  guests?: string;
  notes?: string;
  consent?: boolean;
  company?: string;
};

const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { 'content-type': 'application/json; charset=utf-8' }
});

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let payload: Payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'Invalid request body.' }, 400);
  }

  if (payload.company) return json({ ok: true });
  const name = String(payload.name || '').trim();
  const phone = String(payload.phone || '').trim();
  const email = String(payload.email || '').trim();
  const service = String(payload.service || '').trim();
  const date = String(payload.date || '').trim();
  const time = String(payload.time || '').trim();
  const guests = String(payload.guests || '1').trim();
  const notes = String(payload.notes || '').trim();

  if (!name || (!phone && !email) || !service || !date || !time || !payload.consent) {
    return json({ error: 'Please provide name, phone or email, service, preferred date/time, and consent.' }, 400);
  }

  const bookingEmail = env.BOOKING_EMAIL;
  const resendKey = env.RESEND_API_KEY;
  const fromEmail = env.FROM_EMAIL || 'Oh Nails Website <onboarding@resend.dev>';

  const businessBody = `New appointment request from the Oh Nails website:\n\nName: ${name}\nPhone: ${phone || 'Not provided'}\nEmail: ${email || 'Not provided'}\nPreferred Service: ${service}\nPreferred Date: ${date}\nPreferred Time: ${time}\nNumber of Guests: ${guests}\nNotes / Design Request: ${notes || 'None'}\n\nPlease contact the customer to confirm availability.`;

  const customerBody = `Hi ${name},\n\nThank you for requesting an appointment with Oh Nails.\n\nWe received your request for:\n\nService: ${service}\nPreferred Date: ${date}\nPreferred Time: ${time}\n\nA team member will contact you shortly to confirm availability.\n\nThank you,\nOh Nails\nHemet, CA`;

  if (bookingEmail && resendKey) {
    const emails = [
      {
        from: fromEmail,
        to: [bookingEmail],
        reply_to: email || undefined,
        subject: 'New Appointment Request – Oh Nails Website',
        text: businessBody
      }
    ];
    if (email) {
      emails.push({
        from: fromEmail,
        to: [email],
        reply_to: bookingEmail,
        subject: 'We Received Your Oh Nails Appointment Request',
        text: customerBody
      });
    }

    for (const message of emails) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          authorization: `Bearer ${resendKey}`,
          'content-type': 'application/json'
        },
        body: JSON.stringify(message)
      });
      if (!response.ok) {
        const detail = await response.text();
        return json({ error: 'Appointment captured, but email delivery failed. Please check email settings.', detail }, 502);
      }
    }
  } else {
    console.log('[Oh Nails booking request - configure RESEND_API_KEY and BOOKING_EMAIL]', businessBody);
  }

  return json({ ok: true });
};
