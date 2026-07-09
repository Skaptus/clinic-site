import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { SEO } from '../components/SEO'
import '../blog.css'

export function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy | Dr. Piyush Pediatric Clinic Himayatnagar"
        description="Privacy Policy for Dr. Piyush Pediatric Clinic. Learn how we handle, collect, and protect your information when booking pediatric consultations in Hyderabad."
        keywords={['pediatric clinic privacy', 'Dr Piyush clinic policy', 'patient privacy Himayatnagar']}
      />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline mb-8">
          <ArrowLeft size={16} aria-hidden="true" /> Back to Home
        </Link>
        <p className="text-xs text-ink/50 mb-3">
          Last Updated: July 9, 2026
        </p>
        <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-semibold text-ink leading-tight mb-8">
          Privacy Policy
        </h1>
        <div className="prose-custom">
          <p>
            Welcome to Dr. Piyush Pediatric Clinic ("we", "our", "us"). We operate the website and online booking platform for our clinic based in Himayatnagar, Hyderabad. The privacy of our patients and visitors is of utmost importance to us. This Privacy Policy describes how we collect, use, and protect the information you provide when using our services or our website.
          </p>

          <h2 className="font-heading text-xl sm:text-2xl font-semibold text-ink mt-8 mb-3">
            1. Information We Collect
          </h2>
          <p>
            When you use our online appointment booking form, we collect specific personal information to schedule and process your appointment request. This information includes:
          </p>
          <ul style={{ listStyleType: 'disc', marginLeft: '24px', marginBottom: '16px', color: 'var(--txt2)', fontSize: '15px', lineHeight: '1.75' }}>
            <li><strong>Parent/Guardian Name:</strong> To identify and communicate with the adult responsible for the child.</li>
            <li><strong>Child's Name &amp; Age:</strong> Necessary for preparing medical records and age-appropriate clinical guidance.</li>
            <li><strong>Parent Phone Number &amp; Country Code:</strong> For contact purposes, confirmations, and WhatsApp communication.</li>
            <li><strong>Appointment Information:</strong> Preferred appointment date, appointment type (e.g. general checkup, vaccination, nutrition consultation), and payment method selection.</li>
            <li><strong>Optional Concern:</strong> Any brief description of symptoms or medical concerns you choose to share to help us prepare.</li>
          </ul>

          <h2 className="font-heading text-xl sm:text-2xl font-semibold text-ink mt-8 mb-3">
            2. How We Use Your Information
          </h2>
          <p>
            We use the collected information solely for clinical and scheduling purposes, including:
          </p>
          <ul style={{ listStyleType: 'disc', marginLeft: '24px', marginBottom: '16px', color: 'var(--txt2)', fontSize: '15px', lineHeight: '1.75' }}>
            <li>Scheduling and managing appointment slots at the clinic.</li>
            <li>Contacting you to confirm, reschedule, or discuss your appointment.</li>
            <li>Sending reminders or sharing information relative to pediatric healthcare or vaccinations.</li>
            <li>Responding to customer support queries or feedback.</li>
          </ul>

          <h2 className="font-heading text-xl sm:text-2xl font-semibold text-ink mt-8 mb-3">
            3. Data Transmission &amp; Third-Party Services
          </h2>
          <p>
            Our online booking form is securely processed via Formspree, a third-party form-to-email tool. The submitted data is transmitted securely to our clinic's official email to facilitate scheduling. We do not sell, trade, or otherwise transfer your personally identifiable information to unrelated outside parties.
          </p>

          <h2 className="font-heading text-xl sm:text-2xl font-semibold text-ink mt-8 mb-3">
            4. Security of Information
          </h2>
          <p>
            We implement standard administrative and technical security measures to maintain the safety of your personal information. However, please note that no method of transmission over the Internet or electronic storage is completely secure, and we cannot guarantee its absolute security.
          </p>

          <h2 className="font-heading text-xl sm:text-2xl font-semibold text-ink mt-8 mb-3">
            5. Consent
          </h2>
          <p>
            By using our website, submitting the booking form, or initiating contact through our WhatsApp widget, you consent to the collection and use of your information as detailed in this policy.
          </p>

          <h2 className="font-heading text-xl sm:text-2xl font-semibold text-ink mt-8 mb-3">
            6. Changes to this Policy
          </h2>
          <p>
            We may update our Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date.
          </p>

          <h2 className="font-heading text-xl sm:text-2xl font-semibold text-ink mt-8 mb-3">
            7. Contacting Us
          </h2>
          <p>
            If you have any questions regarding this privacy policy, please reach out to us at:
          </p>
          <p style={{ fontStyle: 'italic', paddingLeft: '16px', borderLeft: '3px solid var(--primary-light)' }}>
            Dr. Piyush Pediatric Clinic<br />
            1-2-62/401, Street No. 6, Near Bank of Baroda,<br />
            Himayatnagar, Hyderabad — 500029<br />
            Phone: 077025 17340
          </p>
        </div>
      </article>
    </>
  )
}
