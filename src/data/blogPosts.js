// src/data/blogPosts.js
// 3 blog posts, local-SEO optimized for "pediatrician Himayatnagar Hyderabad" searches
export const blogPosts = [
  {
    slug: 'when-to-see-pediatrician-for-fever-hyderabad',
    title: 'When to See a Pediatrician for Fever in Children — A Hyderabad Parent’s Guide',
    metaTitle: 'When to See a Pediatrician for Child Fever | Dr. Piyush, Himayatnagar Hyderabad',
    metaDescription: 'Not sure if your child’s fever needs a doctor visit? Dr. Piyush, pediatrician in Himayatnagar, Hyderabad, is here to help you understand child fever and when to see a doctor.',
    keywords: ['pediatrician Himayatnagar', 'child fever doctor Hyderabad', 'when to see pediatrician', 'kids fever treatment'],
    excerpt: 'Fever in children worries every parent. Here’s a simple guide on what’s normal, what needs home care, and when it is time to see a pediatrician.',
    coverImage: '/images/blog/fever-guide.jpg',
    publishDate: '2026-06-15',
    readTime: '5 min read',
    content: [
      { type: 'p', text: 'Fever is one of the most common reasons parents in Himayatnagar and across Hyderabad bring their children to our clinic.' },
      { type: 'h2', text: 'What counts as a fever in children?' },
      { type: 'p', text: 'A body temperature above 100.4°F (38°C) is generally considered a fever. For infants under 3 months, any fever requires immediate attention.' },
      { type: 'h2', text: 'When home care is enough' },
      { type: 'p', text: 'For older children who are eating, drinking, and playful between fever episodes, home care is often sufficient. Ensure they stay hydrated and get plenty of rest.' },
      { type: 'h2', text: 'When to book a pediatrician visit' },
      { type: 'p', text: 'Bring your child in to see us if fever lasts more than 2-3 days, crosses 102°F (39°C), is accompanied by lethargy, or if you feel concerned.' },
      { type: 'h2', text: 'Visit us in Himayatnagar' },
      { type: 'p', text: 'Dr. Piyush Pediatric Clinic is located near Bank of Baroda, above Yogesh Medicines in Himayatnagar, Hyderabad. We are here to support your child\'s health.' }
    ]
  },
  {
    slug: 'vaccination-schedule-guide-infants-hyderabad',
    title: 'Vaccination Schedule Guide for Infants — What Every Hyderabad Parent Should Know',
    metaTitle: 'Infant Vaccination Schedule Guide | Pediatrician in Himayatnagar, Hyderabad',
    metaDescription: 'A complete, easy-to-follow vaccination schedule for infants from birth to 12 months, explained by Dr. Piyush Agarwal.',
    keywords: ['infant vaccination schedule India', 'vaccination pediatrician Hyderabad', 'child immunization Himayatnagar', 'baby vaccination schedule'],
    excerpt: 'Confused about which vaccines your baby needs and when? Here’s a clear month-by-month guide, plus why sticking to the schedule is crucial.',
    coverImage: '/images/blog/vaccination-guide.jpg',
    publishDate: '2026-06-28',
    readTime: '6 min read',
    content: [
      { type: 'p', text: 'One of the most common questions new parents ask at our Himayatnagar clinic is: "Is my baby’s vaccination schedule on track?"' },
      { type: 'h2', text: 'Birth to 6 weeks' },
      { type: 'p', text: 'BCG, Hepatitis B (first dose), and OPV (oral polio) are typically given at birth or within the first few weeks.' },
      { type: 'h2', text: '6, 10, and 14 weeks' },
      { type: 'p', text: 'This is when DTaP, IPV, Hib, Rotavirus, and PCV vaccines begin — usually given in three rounds spaced 4 weeks apart.' },
      { type: 'h2', text: '9 to 12 months' },
      { type: 'p', text: 'MMR (measles, mumps, rubella) and a Vitamin A dose are typically introduced during this stage.' },
      { type: 'h2', text: 'Why sticking to schedule matters' },
      { type: 'p', text: 'Vaccines are timed to work with your baby’s developing immune system. Delaying doses can leave your child vulnerable to infections.' },
      { type: 'h2', text: 'Book your child’s vaccination' },
      { type: 'p', text: 'Dr. Piyush Pediatric Clinic maintains complete vaccination records and reminders for families across Hyderabad. Contact us to schedule a visit.' }
    ]
  },
  {
    slug: 'common-newborn-care-mistakes-hyderabad-parents',
    title: 'Common Newborn Care Mistakes New Parents Make (And How to Avoid Them)',
    metaTitle: 'Newborn Care Mistakes to Avoid | Dr. Piyush Pediatric Clinic, Hyderabad',
    metaDescription: 'New parents in Hyderabad often repeat the same newborn care mistakes. Dr. Piyush shares the most common ones and how to avoid them.',
    keywords: ['newborn care tips Hyderabad', 'new parent mistakes', 'infant care pediatrician Himayatnagar', 'newborn health problems'],
    excerpt: 'From overdressing to skipping burping, these small newborn care mistakes are more common than you think — and easy to fix.',
    coverImage: '/images/blog/newborn-care.jpg',
    publishDate: '2026-07-05',
    readTime: '4 min read',
    content: [
      { type: 'p', text: 'Every parent who walks into our Himayatnagar clinic with a newborn is doing their best under very stressful conditions. Here are common slip-ups.' },
      { type: 'h2', text: 'Overdressing the baby' },
      { type: 'p', text: 'Newborns don’t need multiple layers indoors, especially in Hyderabad’s warmer months. Overheating can lead to heat rash and discomfort.' },
      { type: 'h2', text: 'Skipping burping after feeds' },
      { type: 'p', text: 'Trapped air causes fussiness and spit-up. A gentle burp after every feed — even short ones — makes a big difference.' },
      { type: 'h2', text: 'Waking a sleeping baby to feed on strict schedule' },
      { type: 'p', text: 'Unless your pediatrician has advised a strict feeding schedule for medical reasons, healthy newborns will wake up when hungry.' },
      { type: 'h2', text: 'Delaying the first pediatrician visit' },
      { type: 'p', text: 'The first check-up should happen within the first week after birth, not weeks later. Early visits catch weight loss, jaundice, or other issues.' },
      { type: 'h2', text: 'We’re here to help' },
      { type: 'p', text: 'If you’re a new parent in Himayatnagar or anywhere in Hyderabad, Dr. Piyush Pediatric Clinic offers comprehensive care and guidance.' }
    ]
  }
];

export const getPostBySlug = (slug) => blogPosts.find((p) => p.slug === slug);
