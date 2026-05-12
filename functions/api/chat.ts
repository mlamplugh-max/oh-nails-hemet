interface Env {
  OPENAI_API_KEY?: string;
  OPENAI_BASE_URL?: string;
  OPENAI_MODEL?: string;
}

type ChatMessage = { role: 'assistant' | 'user' | 'system'; text?: string; content?: string };

const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { 'content-type': 'application/json; charset=utf-8' }
});

const systemPrompt = `You are Oh Nails Assistant for Oh Nails, a nail studio / nail salon in Hemet, CA. Be friendly, helpful, polite, and concise.
You can answer about services: manicures, pedicures, acrylic nails, gel nails, nail art, fills, polish changes, French tips, deluxe pedicures, and optional add-ons.
Pricing is starting-price only: Classic Manicure $25+, Gel Manicure $40+, Classic Pedicure $35+, Deluxe Pedicure $50+, Acrylic Full Set $55+, Acrylic Fill $40+, Gel Full Set $60+, Nail Art $5+ per nail, French Tips $10+, Polish Change $15+.
Never confirm appointments or claim calendar availability. Say: "I can help send an appointment request. Oh Nails will confirm your appointment time."
When someone wants to book, collect name, phone number, email, desired service, preferred date, preferred time, and design/photo notes. If details are complete, direct them to the booking form on the page to send the request.
Location: Hemet, CA. Exact address, phone, hours, and final pricing are coming soon. Use placeholders honestly.`;

function fallbackReply(input: string) {
  const lower = input.toLowerCase();
  if (lower.includes('book') || lower.includes('appointment')) return 'I can help send an appointment request. Oh Nails will confirm your appointment time. Please share your name, phone, email, desired service, preferred date/time, and any design notes, or use the booking form on this page.';
  if (lower.includes('price') || lower.includes('cost')) return 'Our listed prices are starting prices only. Classic manicure $25+, gel manicure $40+, classic pedicure $35+, deluxe pedicure $50+, acrylic full set $55+, acrylic fill $40+, gel full set $60+, nail art $5+ per nail, French tips $10+, and polish change $15+.';
  if (lower.includes('where') || lower.includes('direction') || lower.includes('address')) return 'Oh Nails is in Hemet, CA. The exact address is coming soon. You can use the Directions section to open Google Maps.';
  return 'I can help with services, starting prices, directions, design requests, and appointment requests. What would you like to know?';
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const body = await request.json().catch(() => ({}));
  const rawMessages = Array.isArray(body.messages) ? body.messages.slice(-10) as ChatMessage[] : [];
  const last = rawMessages[rawMessages.length - 1]?.text || rawMessages[rawMessages.length - 1]?.content || '';

  if (!env.OPENAI_API_KEY) {
    return json({ reply: fallbackReply(last) });
  }

  const base = env.OPENAI_BASE_URL || 'https://api.openai.com/v1';
  const model = env.OPENAI_MODEL || 'gpt-4o-mini';
  const messages = [
    { role: 'system', content: systemPrompt },
    ...rawMessages.map((m) => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: String(m.text || m.content || '').slice(0, 1200) }))
  ];

  const response = await fetch(`${base.replace(/\/$/, '')}/chat/completions`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.OPENAI_API_KEY}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({ model, messages, temperature: 0.35, max_tokens: 260 })
  });

  if (!response.ok) return json({ reply: fallbackReply(last) });
  const result = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
  return json({ reply: result.choices?.[0]?.message?.content || fallbackReply(last) });
};
