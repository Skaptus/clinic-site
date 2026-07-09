import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { SEO } from '../components/SEO'
import '../blog.css'

export function TermsOfUse() {
  return (
    <>
      <SEO
        title="Terms of Use | Dr. Piyush Pediatric Clinic Himayatnagar"
        description="Terms of use for Dr. Piyush Pediatric Clinic. Read our guidelines regarding medical advice disclaimer, booking policies, fees, and clinic registration."
        keywords={['pediatric clinic terms', 'medical advice disclaimer', 'Dr Piyush terms of use']}
      />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline mb-8">
          <ArrowLeft size={16} aria-hidden="true" /> Back to Home
        </Link>
        <p className="text-xs text-ink/50 mb-3">
          Last Updated: July 9, 2026
        </p>
        <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-semibold text-ink leading-tight mb-8">
          Terms of Use
        </h1>
        <div className="prose-custom">
          <p>
            Welcome to the website of Dr. Piyush Pediatric Clinic. By accessing or using this website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use this website.
          </p>

          <h2 className="font-heading text-xl sm:text-2xl font-semibold text-ink mt-8 mb-3">
            1. Medical Information Disclaimer
          </h2>
          <p style={{ fontWeight: '600', color: 'var(--txt)' }}>
            The content provided on this website—including articles, blog posts, answers to FAQs, graphics, and descriptions—is for general informational purposes only. It does not constitute professional medical advice, diagnosis, or treatment.
          </p>
          <p>
            Never disregard professional medical advice or delay seeking treatment because of something you have read on this website. Always consult with Dr. Piyush Agarwal or another qualified healthcare professional regarding any questions you have about a medical condition or symptoms.
          </p>

          <h2 className="font-heading text-xl sm:text-2xl font-semibold text-ink mt-8 mb-3">
            2. Medical Emergencies
          </h2>
          <p style={{ color: '#dc2626', fontWeight: '600' }}>
            THIS WEBSITE IS NOT FOR EMERGENCY MEDICAL CASES. In the event of a medical emergency, do not submit a booking form or wait for an online response. Please call 108 or go to the nearest hospital emergency room immediately.
          </p>

          <h2 className="font-heading text-xl sm:text-2xl font-semibold text-ink mt-8 mb-3">
            3. Appointments, Bookings, &amp; Fees
          </h2>
          <p>
            Our website allows users to request pediatric appointments. Please note:
          </p>
          <ul style={{ listStyleType: 'disc', marginLeft: '24px', marginBottom: '16px', color: 'var(--txt2)', fontSize: '15px', lineHeight: '1.75' }}>
            <li>Submitting an appointment form represents a <em>request</em>. It does not guarantee a slot until confirmed by our clinic representative via phone call, SMS, or WhatsApp.</li>
            <li>The standard consultation fee is ₹300, which can be paid online or directly at the clinic. Special procedures or immunizations (vaccinations) may incur additional costs.</li>
            <li>We reserve the right to change or reschedule appointments based on clinician availability or emergency duties.</li>
          </ul>

          <h2 className="font-heading text-xl sm:text-2xl font-semibold text-ink mt-8 mb-3">
            4. Professional Registration
          </h2>
          <p>
            Dr. Piyush Agarwal is a registered pediatrician and medical practitioner, registered with the Telangana State Medical Council (Reg. No. TSMC/FMR/15004).
          </p>

          <h2 className="font-heading text-xl sm:text-2xl font-semibold text-ink mt-8 mb-3">
            5. Intellectual Property
          </h2>
          <p>
            The content, design, logo, and graphics on this website are the property of Dr. Piyush Pediatric Clinic. You may read, print, or download pages for personal, non-commercial use only. Any redistribution or commercial reproduction is strictly prohibited.
          </p>

          <h2 className="font-heading text-xl sm:text-2xl font-semibold text-ink mt-8 mb-3">
            6. Limitation of Liability
          </h2>
          <p>
            Dr. Piyush Pediatric Clinic and its staff shall not be held liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use this website, or from relying on any information provided here.
          </p>

          <h2 className="font-heading text-xl sm:text-2xl font-semibold text-ink mt-8 mb-3">
            7. Changes to Terms
          </h2>
          <p>
            We reserve the right to change these Terms of Use at any time. Your continued use of the website following any changes signifies your acceptance of the revised terms.
          </p>
        </div>
      </article>
    </>
  )
}
