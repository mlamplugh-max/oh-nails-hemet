export const businessInfo = {
  name: 'Oh Nails',
  city: 'Hemet',
  state: 'CA',
  phone: '(951) 652-6991',
  email: '',
  address: '2200 W Florida Ave #360, Hemet, CA 92545',
  hours: '',
  bookingEmail: '',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Oh%20Nails%202200%20W%20Florida%20Ave%20%23360%20Hemet%20CA%2092545',
  instagramUrl: '',
  facebookUrl: '',
  temporaryUrl: 'https://oh-nails-hemet.pages.dev/'
} as const;

export const services = [
  {
    name: 'Manicures',
    description: 'Meticulous shaping, cuticle care, polish or gel options, and a refined finish for effortlessly elegant hands.',
    icon: '✦',
    image: '/assets/luxury/luxury-manicure.jpg'
  },
  {
    name: 'Pedicures',
    description: 'A relaxing foot-care ritual with exfoliation, soothing polish, and spa-style details designed for total renewal.',
    icon: '♡',
    image: '/assets/luxury/spa-pedicure.jpg'
  },
  {
    name: 'Acrylic Nails',
    description: 'Sculpted length, balance, fills, shaping, and custom design work for a polished statement look.',
    icon: '✧',
    image: '/assets/luxury/nail-polish-service.jpg'
  },
  {
    name: 'Gel Nails',
    description: 'Glossy, durable, long-wearing color with a smooth high-shine finish and premium salon feel.',
    icon: '❋',
    image: '/assets/luxury/beauty-products.jpg'
  },
  {
    name: 'Nail Art',
    description: 'Detailed accents, French tips, gems, seasonal looks, delicate lines, and elevated custom artistry.',
    icon: '✿',
    image: '/assets/luxury/nail-art-closeup.jpg'
  },
  {
    name: 'Personalized Beauty Services',
    description: 'Finishing beauty add-ons and appointment details tailored to your look. Please ask when booking.',
    icon: '◇',
    image: '/assets/luxury/luxury-beauty.jpg'
  }
] as const;

export const pricing = [
  ['Classic Manicure', '$25+'],
  ['Gel Manicure', '$40+'],
  ['Classic Pedicure', '$35+'],
  ['Deluxe Pedicure', '$50+'],
  ['Acrylic Full Set', '$55+'],
  ['Acrylic Fill', '$40+'],
  ['Gel Full Set', '$60+'],
  ['Nail Art', '$5+ per nail'],
  ['French Tips', '$10+'],
  ['Polish Change', '$15+']
] as const;

export const galleryItems = [
  { title: 'Luxury Nail Care in Hemet', image: '/assets/brand/lotus-hands-wide-1.png' },
  { title: 'Oh Nails Brand Look', image: '/assets/brand/facebook-card.png' },
  { title: 'Vietnamese Lotus Luxury', image: '/assets/brand/lotus-hands-wide-2.png' },
  { title: 'Luxury Manicures', image: '/assets/luxury/luxury-manicure.jpg' },
  { title: 'Spa Pedicures', image: '/assets/luxury/spa-pedicure.jpg' },
  { title: 'Custom Nail Art', image: '/assets/luxury/nail-art-closeup.jpg' }
] as const;
