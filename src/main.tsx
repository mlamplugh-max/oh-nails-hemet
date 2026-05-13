import React, { FormEvent, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock,
  Heart,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  Star,
  X
} from 'lucide-react';
import { businessInfo, galleryItems, pricing, services } from './businessInfo';
import './styles.css';

type AppointmentPayload = {
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  time: string;
  guests: string;
  notes: string;
  consent: boolean;
  company?: string;
};

type ChatMessage = { role: 'assistant' | 'user'; text: string };

const navItems = [
  ['Home', '#home'],
  ['Services', '#services'],
  ['Pricing', '#pricing'],
  ['Gallery', '#gallery'],
  ['Book Appointment', '#booking'],
  ['Directions', '#directions'],
  ['Contact', '#contact']
] as const;

function smoothScroll(id: string) {
  const target = document.querySelector(id);
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero />
        <VisualMotionShowcase />
        <About />
        <LuxuryExperience />
        <BrandLanguage />
        <Services />
        <Pricing />
        <Booking />
        <ChatCallout />
        <Gallery />
        <Directions />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
      <MobileCtas />
    </>
  );
}

function Header({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (value: boolean) => void }) {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Oh Nails home">
        <img src="/assets/oh-nails-logo.png" alt="Oh Nails Nail Studio logo" />
        <span>
          <strong>Oh Nails</strong>
          <small>Hemet, CA</small>
        </span>
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navItems.map(([label, href]) => (
          <a key={href} href={href}>{label}</a>
        ))}
      </nav>
      <button className="nav-cta" onClick={() => smoothScroll('#booking')}>Book Appointment</button>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      {menuOpen && (
        <div className="mobile-menu">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <button onClick={() => { setMenuOpen(false); smoothScroll('#booking'); }}>Book Appointment</button>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const heroSlides = [
    '/assets/luxury/luxury-manicure.jpg',
    '/assets/luxury/nail-art-closeup.jpg',
    '/assets/luxury/spa-pedicure.jpg',
    '/assets/luxury/nail-polish-service.jpg'
  ];
  return (
    <section id="home" className="hero section-shell cinematic-hero">
      <div className="hero-copy reveal">
        <div className="hero-logo-lockup">
          <img src="/assets/oh-nails-logo.png" alt="Oh Nails Nail Studio logo" />
          <div>
            <span className="eyebrow"><Sparkles size={16} /> Luxury nail studio in Hemet, CA</span>
            <strong>Oh Nails Nail Studio</strong>
          </div>
        </div>
        <h1>Luxury Nail Care in Hemet, CA</h1>
        <p>
          Manicures, pedicures, nail art, and personalized beauty services in a soft blush, rose-gold, lotus-inspired studio experience.
        </p>
        <div className="hero-actions">
          <button className="primary-button" onClick={() => smoothScroll('#booking')}>Book Appointment <ChevronRight size={18} /></button>
          <button className="secondary-button" onClick={() => smoothScroll('#gallery')}>Explore The Look</button>
        </div>
        <div className="luxury-proof-row" aria-label="Luxury salon highlights">
          <span>Premium finishes</span>
          <span>Glass-clean aesthetic</span>
          <span>Custom nail artistry</span>
        </div>
      </div>
      <div className="hero-card editorial-hero-card refined-vietnam-hero reveal delay-1">
        <div className="ornamental-frame" aria-hidden="true"></div>
        <div className="refined-hero-visual" aria-label="Luxury Oh Nails brand and service visual">
          <img className="refined-main-photo" src="/assets/brand/hemet-mall-luxury.png" alt="Hemet Valley Mall location with luxury lotus Oh Nails styling" />
          <div className="refined-logo-medallion">
            <img src="/assets/oh-nails-logo.png" alt="Large Oh Nails logo" />
          </div>
          <img className="refined-accent-photo" src="/assets/luxury/nail-art-closeup.jpg" alt="Elegant nail art closeup" />
          <div className="refined-info-card">
            <span>Hemet Mall</span>
            <strong>2200 W Florida Ave #360</strong>
            <small>(951) 652-6991 · Appointment requests welcome</small>
          </div>
        </div>
      </div>
    </section>
  );
}

function VisualMotionShowcase() {
  const looks = [
    ['Oh Nails Lotus', '/assets/brand/facebook-card.png'],
    ['Luxury Banner', '/assets/brand/luxury-banner-clean.png'],
    ['Gel Color', '/assets/luxury/nail-polish-service.jpg'],
    ['Nail Art', '/assets/luxury/nail-art-closeup.jpg'],
    ['Pedicure Spa', '/assets/luxury/spa-pedicure.jpg'],
    ['Manicure Ritual', '/assets/luxury/luxury-manicure.jpg'],
    ['Beauty Lounge', '/assets/luxury/beauty-lounge.jpg'],
    ['Finishing Touches', '/assets/luxury/beauty-products.jpg']
  ];
  return (
    <section className="motion-showcase" aria-label="Oh Nails luxury visual showcase">
      <div className="marquee-track">
        {[...looks, ...looks].map(([label, src], index) => (
          <figure key={`${label}-${index}`}>
            <img src={src} alt={`${label} at Oh Nails`} loading="lazy" />
            <figcaption>{label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function About() {
  const badges = ['Clean & Comfortable Studio', 'Friendly Nail Care', 'Beautiful Custom Styles', 'Convenient Hemet Location'];
  return (
    <section id="about" className="section-shell split-section">
      <div>
        <span className="eyebrow">About Oh Nails</span>
        <h2>Your relaxing beauty moment, designed around your style.</h2>
      </div>
      <div className="copy-card">
        <p>
          At Oh Nails, we believe your nails should look beautiful and your visit should feel relaxing from start to finish.
          Our studio is designed to give every guest a clean, comfortable, and professional experience with services tailored
          to your style. Whether you want a classic manicure, detailed nail art, a fresh pedicure, or a full set, our goal is
          to help you leave feeling confident and cared for.
        </p>
        <div className="badge-grid">
          {badges.map((badge) => <span key={badge}><CheckCircle2 size={16} /> {badge}</span>)}
        </div>
      </div>
    </section>
  );
}

function LuxuryExperience() {
  const moments = [
    ['01', 'Arrive & unwind', 'Step into a soft, calming beauty atmosphere designed to feel personal, clean, and elevated.'],
    ['02', 'Refine your style', 'Choose color, shape, length, finish, and design details with guidance for a polished final look.'],
    ['03', 'Leave glowing', 'Enjoy nails that feel fresh, luxurious, photo-ready, and tailored to your moment.']
  ];
  return (
    <section className="section-shell luxury-experience">
      <div className="luxury-copy glass-panel">
        <span className="eyebrow"><Sparkles size={16} /> Signature experience</span>
        <h2>Designed to feel like a beauty escape — not just an appointment.</h2>
        <p>
          Oh Nails should feel warm, elevated, and memorable from the first tap to the final top coat. This refreshed visual direction blends soft glass textures, editorial nail imagery, champagne accents, and calm movement for a polished luxury salon impression.
        </p>
        <div className="experience-steps">
          {moments.map(([num, title, text]) => (
            <article key={num}>
              <strong>{num}</strong>
              <div><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
      </div>
      <div className="luxury-mosaic">
        <img className="mosaic-large" src="/assets/luxury/beauty-lounge.jpg" alt="Elegant beauty lounge atmosphere" />
        <img className="mosaic-tall" src="/assets/luxury/spa-pedicure.jpg" alt="Luxury pedicure service" />
        <img className="mosaic-wide" src="/assets/luxury/nail-polish-service.jpg" alt="Premium manicure polish service" />
      </div>
    </section>
  );
}

function BrandLanguage() {
  return (
    <section className="section-shell brand-language-section">
      <div className="brand-poster glass-panel glow-panel">
        <img src="/assets/brand/hemet-mall-luxury.png" alt="Hemet Valley Mall location with luxury lotus Oh Nails styling" />
      </div>
      <div className="brand-copy glass-panel glow-panel ornamental-panel">
        <span className="eyebrow">Lotus luxury design language</span>
        <h2>Soft blush beauty with rose-gold Vietnamese-inspired elegance.</h2>
        <p>
          The Oh Nails brand now leans into lotus florals, delicate linework, ornamental corner framing, warm champagne glow, and polished glass panels — a designer salon look that feels feminine, high-end, and culturally inspired without feeling busy.
        </p>
        <div className="motif-grid">
          <span>Lotus details</span>
          <span>Rose-gold frames</span>
          <span>Soft watercolor blush</span>
          <span>Luxury glass panels</span>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="section-shell">
      <SectionHeading eyebrow="Services" title="Elevated services with a polished, spa-lounge feel." description="Image-led service pathways help guests immediately picture their next manicure, pedicure, full set, or custom design." />
      <div className="service-grid">
        {services.map((service) => (
          <article className="service-card premium-service-card" key={service.name}>
            <div className="service-image-wrap"><img src={service.image} alt={`${service.name} service visual`} loading="lazy" /></div>
            <span className="service-icon">{service.icon}</span>
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <button onClick={() => {
              const select = document.querySelector<HTMLSelectElement>('#service');
              if (select) select.value = service.name;
              smoothScroll('#booking');
            }}>Book This Service</button>
          </article>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="section-shell pricing-section">
      <SectionHeading eyebrow="Sample starting prices" title="Simple, transparent starting-price guide." description="Final pricing may vary by length, design, product selection, and customization." />
      <div className="pricing-card">
        <table>
          <thead><tr><th>Service</th><th>Starting Price</th></tr></thead>
          <tbody>
            {pricing.map(([service, price]) => <tr key={service}><td>{service}</td><td>{price}</td></tr>)}
          </tbody>
        </table>
        <p className="disclaimer">
          Pricing may vary based on length, design, product selection, and service customization. Please contact Oh Nails or use the appointment request form for final pricing.
        </p>
      </div>
    </section>
  );
}

function Booking() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload: AppointmentPayload = {
      name: String(data.get('name') || '').trim(),
      phone: String(data.get('phone') || '').trim(),
      email: String(data.get('email') || '').trim(),
      service: String(data.get('service') || '').trim(),
      date: String(data.get('date') || '').trim(),
      time: String(data.get('time') || '').trim(),
      guests: String(data.get('guests') || '1').trim(),
      notes: String(data.get('notes') || '').trim(),
      consent: data.get('consent') === 'on',
      company: String(data.get('company') || '').trim()
    };
    if (!payload.name || (!payload.phone && !payload.email) || !payload.service || !payload.date || !payload.time || !payload.consent) {
      setStatus('error');
      setMessage('Please complete your name, phone or email, service, preferred date/time, and confirmation checkbox.');
      return;
    }
    setStatus('loading');
    setMessage('Sending your appointment request...');
    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Unable to send request.');
      setStatus('success');
      setMessage('Thank you! Your appointment request has been sent to Oh Nails. A team member will contact you to confirm your appointment time.');
      form.reset();
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Unable to send your request right now. Please try again.');
    }
  }

  return (
    <section id="booking" className="section-shell booking-section">
      <div className="booking-intro">
        <span className="eyebrow"><CalendarDays size={16} /> Online appointment request</span>
        <h2>Request your next nail appointment.</h2>
        <p>Tell us what you would like, and Oh Nails will confirm availability. This form does not guarantee a confirmed appointment time.</p>
      </div>
      <form ref={formRef} className="booking-form" onSubmit={submit}>
        <label className="honeypot">Company <input name="company" tabIndex={-1} autoComplete="off" /></label>
        <label>Full Name*<input name="name" required placeholder="Your full name" /></label>
        <div className="form-row">
          <label>Phone Number<input name="phone" type="tel" placeholder="Best callback number" /></label>
          <label>Email Address<input name="email" type="email" placeholder="you@example.com" /></label>
        </div>
        <div className="form-row">
          <label>Preferred Service*
            <select id="service" name="service" required defaultValue="">
              <option value="" disabled>Select a service</option>
              {services.map((s) => <option key={s.name}>{s.name}</option>)}
              <option>Polish Change</option>
              <option>French Tips</option>
              <option>Other / Not Sure</option>
            </select>
          </label>
          <label>Number of Guests<input name="guests" type="number" min="1" max="8" defaultValue="1" /></label>
        </div>
        <div className="form-row">
          <label>Preferred Date*<input name="date" type="date" required /></label>
          <label>Preferred Time*<input name="time" type="time" required /></label>
        </div>
        <label>Notes / Design Requests<textarea name="notes" rows={5} placeholder="Tell us about length, color, nail art, inspiration photo, or special requests." /></label>
        <label className="checkbox"><input name="consent" type="checkbox" required /> <span>I understand this is an appointment request and Oh Nails will confirm availability.</span></label>
        <button className="primary-button full" disabled={status === 'loading'}>{status === 'loading' ? 'Sending...' : 'Send Appointment Request'} <Send size={17} /></button>
        {message && <div className={`form-status ${status}`}>{message}</div>}
      </form>
    </section>
  );
}

function ChatCallout() {
  return (
    <section className="section-shell chat-callout">
      <div>
        <span className="eyebrow"><MessageCircle size={16} /> Oh Nails Assistant</span>
        <h2>Have a quick question?</h2>
        <p>Ask the chat assistant about services, starting prices, directions, design details, or appointment requests.</p>
      </div>
      <button className="secondary-button" onClick={() => window.dispatchEvent(new Event('open-oh-chat'))}>Ask the Assistant</button>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="section-shell">
      <SectionHeading eyebrow="Gallery" title="A soft preview of the Oh Nails style." description="Photos coming soon. Follow Oh Nails for the latest designs and styles." />
      <div className="gallery-grid">
        {galleryItems.map((item) => (
          <figure key={item.title}>
            <img src={item.image} alt={`${item.title} by Oh Nails`} loading="lazy" />
            <figcaption>{item.title}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Directions() {
  const mapUrl = businessInfo.googleMapsUrl || 'https://www.google.com/maps/search/?api=1&query=Oh%20Nails%20Hemet%20CA';
  return (
    <section id="directions" className="section-shell directions-section">
      <div>
        <span className="eyebrow"><MapPin size={16} /> Directions</span>
        <h2>Find Oh Nails in Hemet, CA.</h2>
        <p>Need directions? Use the map below or tap the button to open Google Maps. Visit Oh Nails at Hemet Mall: 2200 W Florida Ave #360, Hemet, CA 92545.</p>
        <a className="primary-button inline" href={mapUrl} target="_blank" rel="noreferrer">Get Directions <ChevronRight size={18} /></a>
      </div>
      <div className="map-card">
        <iframe
          title="Google map showing Oh Nails Hemet CA search"
          src="https://www.google.com/maps?q=Oh%20Nails%20Hemet%20CA&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section-shell contact-section">
      <SectionHeading eyebrow="Contact" title="Ready for beautiful nails?" description="Use the booking form, ask the assistant, or save this page for updated phone, hours, and address details once finalized." />
      <div className="contact-grid">
        <ContactItem icon={<MapPin />} label="Location" value={`${businessInfo.city}, ${businessInfo.state}`} />
        <ContactItem icon={<Phone />} label="Phone" value={businessInfo.phone || 'Coming Soon'} />
        <ContactItem icon={<Mail />} label="Email" value={businessInfo.email || 'Coming Soon'} />
        <ContactItem icon={<Clock />} label="Hours" value={businessInfo.hours || 'Coming Soon'} />
      </div>
      <div className="center-actions">
        <button className="primary-button" onClick={() => smoothScroll('#booking')}>Book Appointment</button>
        <button className="secondary-button" onClick={() => smoothScroll('#directions')}>Get Directions</button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <img src="/assets/oh-nails-logo.png" alt="Oh Nails logo" />
        <p>Oh Nails · Hemet, CA</p>
        <small>© 2026 Oh Nails. All rights reserved. Nail studio serving Hemet, CA and surrounding communities.</small>
      </div>
      <nav>
        <a href="#services">Services</a>
        <a href="#booking">Book Appointment</a>
        <a href="#directions">Directions</a>
        <a href="#contact">Contact</a>
        <a href="#privacy" aria-label="Privacy Policy placeholder">Privacy Policy</a>
        <a href="#terms" aria-label="Terms placeholder">Terms</a>
      </nav>
    </footer>
  );
}

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', text: 'Hi! I’m the Oh Nails Assistant. I can help with services, starting prices, directions, or sending an appointment request. Oh Nails will confirm your appointment time.' }
  ]);

  React.useEffect(() => {
    const listener = () => setOpen(true);
    window.addEventListener('open-oh-chat', listener);
    return () => window.removeEventListener('open-oh-chat', listener);
  }, []);

  const quickPrompts = useMemo(() => ['What are your services?', 'How much is a gel manicure?', 'I want to book', 'Where are you located?'], []);

  async function send(text = input) {
    const value = text.trim();
    if (!value) return;
    const next = [...messages, { role: 'user' as const, text: value }];
    setMessages(next);
    setInput('');
    setLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next })
      });
      const result = await response.json().catch(() => ({}));
      setMessages([...next, { role: 'assistant', text: result.reply || fallbackReply(value) }]);
    } catch {
      setMessages([...next, { role: 'assistant', text: fallbackReply(value) }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`chat-widget ${open ? 'open' : ''}`}>
      {open && (
        <section className="chat-panel" aria-label="Oh Nails Assistant chat">
          <header><strong>Oh Nails Assistant</strong><button onClick={() => setOpen(false)} aria-label="Close chat"><X size={18} /></button></header>
          <div className="chat-messages">
            {messages.map((msg, index) => <div key={index} className={`bubble ${msg.role}`}>{msg.text}</div>)}
            {loading && <div className="bubble assistant">Typing...</div>}
          </div>
          <div className="quick-prompts">
            {quickPrompts.map((prompt) => <button key={prompt} onClick={() => send(prompt)}>{prompt}</button>)}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(); }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about services or booking..." />
            <button aria-label="Send message"><Send size={16} /></button>
          </form>
        </section>
      )}
      <button className="chat-toggle" onClick={() => setOpen(!open)} aria-label="Open Oh Nails Assistant">
        <MessageCircle />
      </button>
    </div>
  );
}

function fallbackReply(text: string) {
  const lower = text.toLowerCase();
  if (lower.includes('book') || lower.includes('appointment')) return 'I can help send an appointment request. Please share your name, phone number, email, desired service, preferred date, preferred time, and any design notes. Oh Nails will confirm your appointment time.';
  if (lower.includes('price') || lower.includes('cost') || lower.includes('gel')) return 'Starting prices are listed on the pricing guide: classic manicure $25+, gel manicure $40+, classic pedicure $35+, deluxe pedicure $50+, acrylic full set $55+, acrylic fill $40+, and nail art $5+ per nail. Final pricing may vary.';
  if (lower.includes('direction') || lower.includes('where') || lower.includes('location')) return 'Oh Nails is located in Hemet, CA. The exact address is coming soon. You can use the Directions section to open a Google Maps search.';
  return 'I can help with manicures, pedicures, acrylic nails, gel nails, nail art, starting prices, directions, or appointment requests. What would you like help with?';
}

function MobileCtas() {
  const mapsUrl = businessInfo.googleMapsUrl || 'https://www.google.com/maps/search/?api=1&query=Oh%20Nails%20Hemet%20CA';
  return (
    <div className="mobile-ctas">
      <button onClick={() => smoothScroll('#booking')}><CalendarDays size={16} /> Book</button>
      <a href={businessInfo.phone ? `tel:${businessInfo.phone}` : '#contact'}><Phone size={16} /> Call</a>
      <a href={mapsUrl} target="_blank" rel="noreferrer"><MapPin size={16} /> Directions</a>
    </div>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2><p>{description}</p></div>;
}

function ContactItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <article className="contact-card">{icon}<span>{label}</span><strong>{value}</strong></article>;
}

createRoot(document.getElementById('root')!).render(<App />);
