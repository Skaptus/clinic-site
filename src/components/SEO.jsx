// src/components/SEO.jsx
// Handles per-page meta tags + local business / article structured data
import { Helmet } from 'react-helmet-async'

const CLINIC_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  name: 'Dr. Piyush Pediatric Clinic',
  image: '/images/clinic-exterior.jpg',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1-2-62, 401, Street No. 6, near Bank of Baroda, above Yogesh Medicines',
    addressLocality: 'Himayatnagar, Hyderabad',
    addressRegion: 'Telangana',
    postalCode: '500029',
    addressCountry: 'IN',
  },
  telephone: '+91-77025-17340',
  medicalSpecialty: 'Pediatric',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '69',
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '09:00', closes: '13:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '17:00', closes: '20:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday'], opens: '12:00', closes: '16:00' },
  ],
}

export function SEO({ title, description, keywords = [], articleData = null }) {
  const jsonLd = articleData
    ? {
        '@context': 'https://schema.org',
        '@type': 'MedicalWebPage',
        headline: articleData.title,
        datePublished: articleData.publishDate,
        author: { '@type': 'Person', name: 'Dr. Piyush Agarwal' },
        publisher: { '@type': 'MedicalClinic', name: 'Dr. Piyush Pediatric Clinic' },
      }
    : CLINIC_JSON_LD

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={articleData ? 'article' : 'website'} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  )
}
