import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Check } from 'lucide-react'
import { SEO } from '../components/SEO'
import { getServiceBySlug } from '../data/servicesData'
import '../blog.css'

export function ServiceDetail({ setIsModalOpen, setAppointmentType }) {
  const { slug } = useParams()
  const service = getServiceBySlug(slug)

  if (!service) {
    return <Navigate to="/" replace />
  }
  return (
    <>
      <SEO
        title={service.seoTitle}
        description={service.seoDesc}
        keywords={[service.title, 'pediatrician Himayatnagar', 'child specialist Hyderabad']}
      />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <Link to="/" state={{ scrollTo: 'services' }} className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline mb-8">
          <ArrowLeft size={16} aria-hidden="true" /> Back to Services
        </Link>

        {/* Icon & Title */}
        <div className="flex items-center gap-4 mb-6">
          <div 
            className="svc-icon-large" 
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'var(--pur-lt)',
              color: 'var(--pur3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              flexShrink: 0
            }}
          >
            <i className={service.iconClass}></i>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-semibold text-ink leading-tight">
            {service.title}
          </h1>
        </div>

        {/* Content Section */}
        <div className="prose-custom">
          <p style={{ fontSize: '18px', color: 'var(--txt)', lineHeight: '1.6', marginBottom: '24px', fontWeight: '500' }}>
            {service.shortDesc}
          </p>
          <p style={{ marginBottom: '32px' }}>
            {service.longDesc}
          </p>

          <h2 className="font-heading text-xl sm:text-2xl font-semibold text-ink mt-8 mb-4" style={{ borderBottom: '1px solid var(--crm-md)', paddingBottom: '8px' }}>
            What We Monitor &amp; Cover
          </h2>
          
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0' }}>
            {service.whatWeCover.map((item, index) => (
              <li 
                key={index} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '12px', 
                  marginBottom: '16px', 
                  fontSize: '15px', 
                  lineHeight: '1.6', 
                  color: 'var(--txt2)' 
                }}
              >
                <span 
                  style={{ 
                    background: 'var(--pur-xlt)', 
                    color: 'var(--pur3)', 
                    borderRadius: '50%', 
                    padding: '4px', 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginTop: '2px'
                  }}
                >
                  <Check size={14} strokeWidth={3} />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Call to Action Box */}
        <div 
          className="booking-cta-box"
          style={{
            background: 'var(--pur-xlt)',
            border: '1px solid var(--pur-lt)',
            borderRadius: 'var(--radius)',
            padding: '24px',
            textAlign: 'center',
            marginTop: '40px'
          }}
        >
          <h3 className="font-heading text-lg sm:text-xl font-medium text-ink mb-2">
            Need {service.title} for Your Child?
          </h3>
          <p style={{ color: 'var(--txt2)', fontSize: '14px', marginBottom: '20px', maxWidth: '480px', margin: '0 auto 20px' }}>
            Schedule an appointment with Dr. Piyush Agarwal at our Himayatnagar clinic. Secure your consultation slot online today.
          </p>
          <button
            onClick={() => {
              setAppointmentType(service.apptType);
              setIsModalOpen(true);
            }}
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-medium px-6 py-3 rounded-full transition-colors cursor-pointer"
            style={{ border: 'none' }}
          >
            Book Appointment <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </article>
    </>
  )
}
