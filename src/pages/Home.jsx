import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import doctorImg from '../assets/doctor.jpg';
import vaccineImg from '../assets/vaccine.jpg';
import iconWhatsapp from '../assets/icon_whatsapp.png';
import iconFacebook from '../assets/icon_facebook.png';
import iconGoogleMap from '../assets/icon_googlemap.png';
import iconInstagram from '../assets/icon_instagram.png';

const HEADER_OFFSET = 80;

export function smoothScrollTo(targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const absoluteTop = rect.top + window.pageYOffset - HEADER_OFFSET;
  window.scrollTo({ top: absoluteTop, behavior: 'smooth' });
}

export function Home({ setIsModalOpen }) {
  const location = useLocation();

  useEffect(() => {
    // Handle scroll to section if hash is present
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const timer = setTimeout(() => {
        smoothScrollTo(targetId);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

  useEffect(() => {
    // FAQ Click toggling
    const handleFaqClick = function() {
      const item = this.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    };
    
    document.querySelectorAll('.faq-q').forEach(q => {
      q.addEventListener('click', handleFaqClick);
    });

    // Fade-in on scroll IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 0.08}s`;
      observer.observe(el);
    });

    // Section Observer for active states in header links
    const sections = ['home', 'about', 'vaccinations', 'gallery', 'services', 'reviews', 'faq', 'contact'];
    const navLinksList = document.querySelectorAll('header .nav-links .nav-scroll');

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinksList.forEach(link => {
            const matches = link.getAttribute('data-target') === id;
            link.style.color = matches ? 'var(--pur)' : '';
            link.style.background = matches ? 'var(--pur-xlt)' : '';
          });
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });

    return () => {
      document.querySelectorAll('.faq-q').forEach(q => {
        q.removeEventListener('click', handleFaqClick);
      });
      observer.disconnect();
      sectionObserver.disconnect();
      // Clear link active states when leaving Home page
      navLinksList.forEach(link => {
        link.style.color = '';
        link.style.background = '';
      });
    };
  }, []);

  return (
    <>
      {/*  ─── HERO ────────────────────────────────────────────────────  */}
      <section id="home">
        <div className="hero-blob hero-blob-1"></div>
        <div className="hero-blob hero-blob-2"></div>
        <div className="hero-blob hero-blob-3"></div>
        <div className="hero-img-wrap" aria-hidden="true">
          <img src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200&q=80" alt="Pediatric care" />
        </div>
        <div className="container">
          <div className="hero-content fade-in">
            <div className="hero-tag">
              <div className="hero-tag-dot"></div>
              <span>Trusted Pediatrician · Himayatnagar, Hyderabad</span>
            </div>
            <h1>Your Child's Health<br />Is Our <em>Greatest</em> Priority</h1>
            <p className="hero-sub">Compassionate, expert paediatric care from birth to adolescence. Backed by 6 years of experience, 5-star reviews, and a warm heart for every little patient.</p>
            <div className="hero-btns">
              <a href="#!" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }} className="btn btn-amber btn-lg"><i className="ti ti-calendar-plus"></i> Book Appointment</a>
              <a href="tel:07702517340" className="btn btn-outline btn-lg" style={{color: '#fff', borderColor: 'rgba(255,255,255,.4)'}}><i className="ti ti-phone"></i> Call Now</a>
            </div>
            <div className="hero-stats">
              <div className="h-stat"><div className="num">6+</div><div className="label">Years Experience</div></div>
              <div className="h-stat-div"></div>
              <div className="h-stat"><div className="num">5.0</div><div className="label">Google Rating</div></div>
              <div className="h-stat-div"></div>
              <div className="h-stat"><div className="num">69+</div><div className="label">Happy Reviews</div></div>
              <div className="h-stat-div"></div>
              <div className="h-stat"><div className="num">₹300</div><div className="label">Consult Fee</div></div>
            </div>
          </div>
        </div>
      </section>

      {/*  ─── TRUST BAR ───────────────────────────────────────────────  */}
      <div className="trust-bar">
        <div className="container">
          <div className="trust-inner">
            <div className="trust-item">
              <div className="trust-icon"><i className="ti ti-certificate"></i></div>
              <div className="trust-text"><div className="t-val">MBBS, MD</div><div className="t-lbl">Qualified Pediatrician</div></div>
            </div>
            <div className="trust-item">
              <div className="trust-icon"><i className="ti ti-stars"></i></div>
              <div className="trust-text"><div className="t-val">5.0 ★</div><div className="t-lbl">Google Reviews</div></div>
            </div>
            <div className="trust-item">
              <div className="trust-icon"><i className="ti ti-device-mobile-message"></i></div>
              <div className="trust-text"><div className="t-val">Teleconsult</div><div className="t-lbl">Available Online</div></div>
            </div>
            <div className="trust-item">
              <div className="trust-icon"><i className="ti ti-clock"></i></div>
              <div className="trust-text"><div className="t-val">Mon–Sun</div><div className="t-lbl">Flexible Timings</div></div>
            </div>
            <div className="trust-item">
              <div className="trust-icon"><i className="ti ti-heart-handshake"></i></div>
              <div className="trust-text"><div className="t-val">Gentle Care</div><div className="t-lbl">Child-Friendly Clinic</div></div>
            </div>
          </div>
        </div>
      </div>

      {/*  ─── ABOUT ───────────────────────────────────────────────────  */}
      <section id="about" className="section">
        <div className="container">
          <div className="grid-2">
            <div className="about-img-wrap fade-in-left">
              <img src={doctorImg} alt="Dr. Piyush Agarwal - Pediatrician" style={{ objectPosition: "center 20%" }} />
              <div className="about-img-badge">
                <div className="b-val">6+ Yrs</div>
                <div className="b-lbl">Clinical Experience</div>
              </div>
              <div className="about-img-badge2">
                <div className="b-val">₹300</div>
                <div className="b-lbl">Consultation Fee</div>
              </div>
            </div>
            <div className="about-content fade-in-right">
              <div className="tag">About the Doctor</div>
              <h2>Dr. Piyush Agarwal — Where Expertise Meets Empathy</h2>
              <p>Dr. Piyush Agarwal is a dedicated paediatrician based in Himayatnagar, Hyderabad, bringing warmth, precision, and genuine care to every consultation. From newborns to teenagers, he provides complete paediatric healthcare that reassures both children and their parents.</p>
              <p>With a patient-first philosophy built on clear communication and attentive listening, Dr. Piyush ensures every family leaves the clinic feeling confident, informed, and supported — not just treated.</p>
              <div className="about-creds">
                <div className="cred-item">
                  <div className="cred-icon"><i className="ti ti-school"></i></div>
                  <div className="cred-text">
                    <div className="c-title">MBBS — DR. NTR University of Health Sciences (2020)</div>
                    <div className="c-sub">Andhra Pradesh</div>
                  </div>
                </div>
                <div className="cred-item">
                  <div className="cred-icon"><i className="ti ti-award"></i></div>
                  <div className="cred-text">
                    <div className="c-title">MD Pediatrics — Kaloji Narayana Rao University (2025)</div>
                    <div className="c-sub">Warangal, Telangana</div>
                  </div>
                </div>
                <div className="cred-item">
                  <div className="cred-icon"><i className="ti ti-id-badge"></i></div>
                  <div className="cred-text">
                    <div className="c-title">Reg. No. TSMC/FMR/15004 — Telangana Medical Council</div>
                    <div className="c-sub">Licensed & Registered (2021)</div>
                  </div>
                </div>
              </div>
              <div className="about-tags">
                <span className="about-tag"><i className="ti ti-ear"></i> Patient Listener</span>
                <span className="about-tag"><i className="ti ti-message-circle"></i> Clear Explanations</span>
                <span className="about-tag"><i className="ti ti-baby"></i> Gentle with Children</span>
                <span className="about-tag"><i className="ti ti-heart"></i> Parent-Friendly</span>
              </div>
              <div style={{marginTop: '32px'}}>
                <a href="#!" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }} className="btn btn-primary"><i className="ti ti-calendar-plus"></i> Schedule a Visit</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  ─── SECONDARY CTA ───────────────────────────────────────────  */}
      <div className="cta-banner">
        <div className="container">
          <div className="fade-in">
            <div className="tag" style={{background: 'rgba(255,255,255,.15)', color: '#fff', border: '1px solid rgba(255,255,255,.25)'}}>Quick Appointment</div>
            <h2>Your Child Deserves the Best Care — Today</h2>
            <p>Morning, evening, or Sunday — we're here when your child needs us. Teleconsultation also available for your convenience.</p>
            <div style={{display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap'}}>
              <a href="#!" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }} className="btn btn-amber btn-lg"><i className="ti ti-calendar-plus"></i> Book Appointment</a>
              <a href="tel:07702517340" className="btn" style={{background: 'rgba(255,255,255,.12)', color: '#fff', border: '1px solid rgba(255,255,255,.25)', fontSize: '16px', padding: '18px 36px'}}><i className="ti ti-phone"></i> 077025 17340</a>
            </div>
          </div>
        </div>
      </div>

      {/*  ─── VACCINATIONS ────────────────────────────────────────────  */}
      <section id="vaccinations" className="section">
        <div className="container">
          <div className="vacc-grid">
            <div className="vacc-visual fade-in-left">
              <img src={vaccineImg} alt="Child vaccination" />
            </div>
            <div className="vacc-content fade-in-right">
              <div className="tag amb">Immunisation Programme</div>
              <h2>Vaccinations &amp; Immunizations</h2>
              <p>Vaccines are among the most powerful tools in modern medicine — a single dose can protect your child from potentially life-threatening diseases for years to come. At Dr. Piyush Pediatric Clinic, we follow the <strong>IAP (Indian Academy of Pediatrics)</strong> immunisation schedule to ensure every child is protected at exactly the right time.</p>
              <p>From the very first BCG shot at birth to the teenage HPV vaccine, we maintain precise records, send timely reminders, and administer all vaccines in a calm, child-friendly environment that minimises anxiety and discomfort.</p>
              <div className="vacc-list">
                <div className="vacc-item">
                  <div className="vacc-check"><i className="ti ti-check"></i></div>
                  <div className="vacc-item-text"><div className="vi-title">IAP-Recommended Schedule</div><div className="vi-desc">Complete newborn to adolescent vaccination programme</div></div>
                </div>
                <div className="vacc-item">
                  <div className="vacc-check"><i className="ti ti-check"></i></div>
                  <div className="vacc-item-text"><div className="vi-title">Catch-Up Immunisation</div><div className="vi-desc">For children who missed scheduled doses</div></div>
                </div>
                <div className="vacc-item">
                  <div className="vacc-check"><i className="ti ti-check"></i></div>
                  <div className="vacc-item-text"><div className="vi-title">Travel Vaccines</div><div className="vi-desc">Protection for travel to high-risk regions</div></div>
                </div>
                <div className="vacc-item">
                  <div className="vacc-check"><i className="ti ti-check"></i></div>
                  <div className="vacc-item-text"><div className="vi-title">Digital Vaccine Records</div><div className="vi-desc">Secure records with reminder notifications</div></div>
                </div>
              </div>
              <div className="vacc-note">
                <i className="ti ti-info-circle"></i>
                <span>All vaccines are stored in certified cold-chain conditions ensuring 100% potency and safety.</span>
              </div>
              <div style={{marginTop: '28px'}}>
                <a href="#!" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }} className="btn btn-primary"><i className="ti ti-vaccine"></i> Book Vaccine Appointment</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  ─── GALLERY ─────────────────────────────────────────────────  */}
      <section id="gallery" className="section" style={{background: 'var(--crm-lt)'}}>
        <div className="container">
          <div className="gallery-head fade-in">
            <div className="tag">Clinic Gallery</div>
            <h2>A Warm &amp; Welcoming Space for Every Child</h2>
            <p style={{maxWidth: '540px', margin: '0 auto', color: 'var(--txt2)'}}>Our clinic is designed to be calm, colourful, and child-friendly — because comfort matters as much as care.</p>
          </div>
          <div className="gallery-grid">
            <div className="gal-item">
              <img src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&q=80" alt="Clinic consultation room" />
              <div className="gal-overlay"></div>
              <div className="gal-label">Consultation Room</div>
            </div>
            <div className="gal-item">
              <img src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&q=80" alt="Doctor with patient" />
              <div className="gal-overlay"></div>
              <div className="gal-label">Patient Care</div>
            </div>
            <div className="gal-item">
              <img src="https://images.unsplash.com/photo-1587351021355-a479a299d2f9?w=600&q=80" alt="Clinic waiting area" />
              <div className="gal-overlay"></div>
              <div className="gal-label">Waiting Area</div>
            </div>
            <div className="gal-item">
              <img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80" alt="Paediatric checkup" />
              <div className="gal-overlay"></div>
              <div className="gal-label">Check-up</div>
            </div>
            <div className="gal-item">
              <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80" alt="Medical equipment" />
              <div className="gal-overlay"></div>
              <div className="gal-label">Modern Equipment</div>
            </div>
          </div>
        </div>
      </section>

      {/*  ─── SERVICES ────────────────────────────────────────────────  */}
      <section id="services" className="section">
        <div className="container">
          <div className="services-head fade-in">
            <div className="tag">What We Offer</div>
            <h2>Comprehensive Care, From Newborn to Teen</h2>
            <p>Every child is unique. Our services are tailored to meet the specific developmental, preventive, and medical needs of children at every stage of growth.</p>
          </div>
          <div className="svc-grid">
            <div className="svc-card fade-in">
              <div className="svc-icon"><i className="ti ti-baby-carriage"></i></div>
              <h3>Well-Baby Check-ups</h3>
              <p>Regular developmental monitoring from birth — tracking growth milestones, weight, height, and overall health at every stage.</p>
            </div>
            <div className="svc-card fade-in">
              <div className="svc-icon"><i className="ti ti-vaccine"></i></div>
              <h3>Vaccinations &amp; Immunizations</h3>
              <p>Complete IAP vaccine schedule for newborns through adolescents, with digital records and timely reminders.</p>
            </div>
            <div className="svc-card fade-in">
              <div className="svc-icon"><i className="ti ti-thermometer"></i></div>
              <h3>Fever &amp; Infection Treatment</h3>
              <p>Accurate diagnosis and targeted treatment of bacterial, viral, and respiratory infections with rapid recovery protocols.</p>
            </div>
            <div className="svc-card fade-in">
              <div className="svc-icon"><i className="ti ti-heart-rate-monitor"></i></div>
              <h3>Newborn Care</h3>
              <p>Specialised neonatal consultations, breastfeeding guidance, jaundice monitoring, and new-parent support from day one.</p>
            </div>
            <div className="svc-card fade-in">
              <div className="svc-icon"><i className="ti ti-salad"></i></div>
              <h3>Nutrition &amp; Growth Counseling</h3>
              <p>Personalised dietary guidance, growth chart monitoring, and nutritional advice to ensure optimal physical development.</p>
            </div>
            <div className="svc-card fade-in">
              <div className="svc-icon"><i className="ti ti-brain"></i></div>
              <h3>Development Screening</h3>
              <p>Comprehensive assessment of cognitive, motor, speech, and behavioural milestones with early intervention guidance.</p>
            </div>
            <div className="svc-card fade-in">
              <div className="svc-icon"><i className="ti ti-device-mobile-message"></i></div>
              <h3>Teleconsultation</h3>
              <p>Convenient video or phone consultations for minor concerns, follow-ups, and parent queries — from the comfort of home.</p>
            </div>
            <div className="svc-card fade-in">
              <div className="svc-icon"><i className="ti ti-stethoscope"></i></div>
              <h3>General Paediatric Care</h3>
              <p>Treatment for rashes, allergies, digestive issues, ENT concerns, and all general childhood ailments with compassionate care.</p>
            </div>
          </div>
          <div style={{textAlign: 'center', marginTop: '48px', paddingTop: '12px'}} className="fade-in">
            <a href="#!" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }} className="btn btn-amber btn-lg"><i className="ti ti-calendar-plus"></i> Schedule Your Visit</a>
          </div>
        </div>
      </section>

      {/*  ─── REVIEWS HEADLINE ────────────────────────────────────────  */}
      <section id="reviews" style={{background: 'var(--crm-lt)', padding: '80px 0 0'}}>
        <div className="container">
          <div className="reviews-hero fade-in">
            <div className="tag">Parent Reviews</div>
            <h2>Trusted by Hundreds of Hyderabad Families</h2>
            <p>Every review is a story of a child who felt better and a parent who felt reassured. Here's what families who visit our clinic have to say.</p>
            <div className="rating-display">
              <div className="rating-number">5.0</div>
              <div className="rating-stars">
                <i className="ti ti-star-filled"></i><i className="ti ti-star-filled"></i><i className="ti ti-star-filled"></i><i className="ti ti-star-filled"></i><i className="ti ti-star-filled"></i>
              </div>
              <div className="rating-count">69 verified Google reviews</div>
            </div>
            <div className="rating-badges">
              <span className="r-badge">Clear Explanations</span>
              <span className="r-badge">Patient Listening</span>
              <span className="r-badge">Teleconsultation</span>
              <span className="r-badge">Quick Responses</span>
              <span className="r-badge">Accurate Diagnosis</span>
              <span className="r-badge">Warm Atmosphere</span>
            </div>
          </div>
        </div>
      </section>

      {/*  ─── INSTAGRAM REELS ───────────────────────────────────────────  */}
      <section id="reels" className="video-section">
        <div className="container">
          <div className="video-head fade-in">
            <div className="tag" style={{background: 'rgba(162,119,179,.2)', color: 'var(--pur)'}}>Instagram Reels</div>
            <h2 style={{color: '#fff'}}>Helpful Tips from Dr. Piyush</h2>
            <p style={{color: 'rgba(255,255,255,.6)', maxWidth: '520px', margin: '0 auto'}}>Stay updated with our latest health tips, clinic moments, and child care advice.</p>
          </div>
          <div className="grid-3 fade-in" style={{marginTop: '48px'}}>
            <div className="reel-wrap" style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,.5)', background: '#fff', height: '540px', position: 'relative'}}>
              <iframe src="https://www.instagram.com/reel/DRWOaBWEcF6/embed" style={{width: '100%', height: '100%', border: 'none'}} scrolling="no" allowTransparency="true" allow="encrypted-media"></iframe>
            </div>
            <div className="reel-wrap" style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,.5)', background: '#fff', height: '540px', position: 'relative'}}>
              <iframe src="https://www.instagram.com/reel/DR9BJ4tka6m/embed" style={{width: '100%', height: '100%', border: 'none'}} scrolling="no" allowTransparency="true" allow="encrypted-media"></iframe>
            </div>
            <div className="reel-wrap" style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,.5)', background: '#fff', height: '540px', position: 'relative'}}>
              <iframe src="https://www.instagram.com/reel/DQEAbdUkRSZ/embed" style={{width: '100%', height: '100%', border: 'none'}} scrolling="no" allowTransparency="true" allow="encrypted-media"></iframe>
            </div>
          </div>
          <div style={{textAlign: 'center', marginTop: '48px'}} className="fade-in">
            <a href="https://www.instagram.com/dr.piyush_pediatricclinic/" target="_blank" rel="noopener noreferrer" className="btn btn-primary"><i className="ti ti-brand-instagram"></i> Follow us on Instagram</a>
          </div>
        </div>
      </section>

      {/*  ─── TESTIMONIALS ────────────────────────────────────────────  */}
      <section id="testimonials" className="section">
        <div className="container">
          <div className="testi-head fade-in">
            <div className="tag">Patient Stories</div>
            <h2>Real Families, Real Experiences</h2>
          </div>
          <div className="testi-grid">
            <div className="testi-card fade-in">
              <div className="testi-quote-icon">"</div>
              <div className="testi-stars">
                <i className="ti ti-star-filled"></i><i className="ti ti-star-filled"></i><i className="ti ti-star-filled"></i><i className="ti ti-star-filled"></i><i className="ti ti-star-filled"></i>
              </div>
              <p className="testi-text">Dr. Piyush is an excellent doctor. My son had a bacterial infection and he diagnosed it accurately and treated it with the right medicines. Thanks to his expertise, my son recovered within just a few days. The entire healing process was smooth and the doctor's clear communication made it stress-free for us as parents.</p>
              <div className="testi-author">
                <div className="testi-avatar">DA</div>
                <div>
                  <div className="testi-name">Divya Agarwal</div>
                  <div className="testi-meta">Local Guide · 15 reviews · 3 months ago</div>
                </div>
                <div className="testi-source">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Google
                </div>
              </div>
            </div>
            <div className="testi-card fade-in">
              <div className="testi-quote-icon">"</div>
              <div className="testi-stars">
                <i className="ti ti-star-filled"></i><i className="ti ti-star-filled"></i><i className="ti ti-star-filled"></i><i className="ti ti-star-filled"></i><i className="ti ti-star-filled"></i>
              </div>
              <p className="testi-text">Had a great experience at the clinic. Dr. Piyush was extremely patient, knowledgeable, and reassuring. I brought my son Vihaan along and he was very gentle, attentive, and thorough while explaining everything clearly. You can genuinely feel that he truly cares about his patients. We couldn't be happier with the care we received.</p>
              <div className="testi-author">
                <div className="testi-avatar">SD</div>
                <div>
                  <div className="testi-name">Siddharth Dalmia</div>
                  <div className="testi-meta">1 review · 2 months ago</div>
                </div>
                <div className="testi-source">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Google
                </div>
              </div>
            </div>
            <div className="testi-card fade-in">
              <div className="testi-quote-icon">"</div>
              <div className="testi-stars">
                <i className="ti ti-star-filled"></i><i className="ti ti-star-filled"></i><i className="ti ti-star-filled"></i><i className="ti ti-star-filled"></i><i className="ti ti-star-filled"></i>
              </div>
              <p className="testi-text">Dr. Piyush has been my son's doctor since the day he was born. He has always been extremely supportive, patiently clearing all my doubts and answering every question at any time. When it comes to my son's health, he has truly been our pillar of support. The staff is friendly and the atmosphere is warm — always a reassuring experience.</p>
              <div className="testi-author">
                <div className="testi-avatar">DM</div>
                <div>
                  <div className="testi-name">Devyani Mundhra</div>
                  <div className="testi-meta">2 reviews · 3 months ago</div>
                </div>
                <div className="testi-source">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Google
                </div>
              </div>
            </div>
          </div>
          <div style={{textAlign: 'center', marginTop: '40px'}} className="fade-in">
            <a href="https://www.google.com/maps/place/Dr.+Piyush+Pediatric+Clinic" target="_blank" rel="noopener noreferrer" className="btn btn-outline"><i className="ti ti-brand-google"></i> Read All 69 Reviews on Google</a>
          </div>
        </div>
      </section>

      {/*  ─── FAQ ─────────────────────────────────────────────────────  */}
      <section id="faq" className="section">
        <div className="container">
          <div className="faq-grid">
            <div className="faq-left fade-in-left">
              <div className="tag">Common Questions</div>
              <h2>Questions Parents Ask Most</h2>
              <p>We believe informed parents make the best decisions for their children. Here are answers to the questions we hear most often at the clinic.</p>
              <div className="faq-contact">
                <p>Still have questions? We're happy to help directly.</p>
                <div className="fc-item"><i className="ti ti-phone"></i> 077025 17340</div>
                <div className="fc-item"><i className="ti ti-brand-whatsapp"></i> WhatsApp us anytime</div>
                <div className="fc-item"><i className="ti ti-map-pin"></i> Himayatnagar, Hyderabad</div>
                <div style={{marginTop: '16px'}}>
                  <a href="https://wa.me/917702517340" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{width: '100%', justifyContent: 'center'}}><i className="ti ti-brand-whatsapp"></i> Chat on WhatsApp</a>
                </div>
              </div>
            </div>
            <div className="faq-list fade-in-right">
              <div className="faq-item">
                <div className="faq-q">What are the clinic timings? <i className="ti ti-plus"></i></div>
                <div className="faq-a"><div className="faq-a-inner">Monday to Saturday: 9:00 AM – 1:00 PM (Morning) and 5:00 PM – 8:00 PM (Evening). Sunday: 12:00 PM – 4:00 PM. Teleconsultation is available beyond these hours on request.</div></div>
              </div>
              <div className="faq-item">
                <div className="faq-q">What is the consultation fee? <i className="ti ti-plus"></i></div>
                <div className="faq-a"><div className="faq-a-inner">The consultation fee is ₹300 for in-clinic visits. Teleconsultation charges may vary — please call or WhatsApp us for current pricing.</div></div>
              </div>
              <div className="faq-item">
                <div className="faq-q">Is teleconsultation available? <i className="ti ti-plus"></i></div>
                <div className="faq-a"><div className="faq-a-inner">Yes! Dr. Piyush offers teleconsultation via phone and video call for minor concerns, follow-ups, vaccine queries, and general paediatric advice. Simply WhatsApp us to schedule a session.</div></div>
              </div>
              <div className="faq-item">
                <div className="faq-q">What age group does Dr. Piyush treat? <i className="ti ti-plus"></i></div>
                <div className="faq-a"><div className="faq-a-inner">Dr. Piyush sees children from birth (newborns) through 18 years of age. This includes neonatal care, infant check-ups, school-age children, and adolescents.</div></div>
              </div>
              <div className="faq-item">
                <div className="faq-q">Do I need to book in advance or can I walk in? <i className="ti ti-plus"></i></div>
                <div className="faq-a"><div className="faq-a-inner">Walk-in patients are welcome, however we recommend booking in advance to minimise waiting time, especially for evening slots which tend to fill up quickly. You can book via phone or WhatsApp.</div></div>
              </div>
              <div className="faq-item">
                <div className="faq-q">Should I bring previous medical reports? <i className="ti ti-plus"></i></div>
                <div className="faq-a"><div className="faq-a-inner">Yes, if available, please bring any previous prescription slips, test reports, vaccination records, or discharge summaries. This helps Dr. Piyush provide the most accurate and personalised care for your child.</div></div>
              </div>
              <div className="faq-item">
                <div className="faq-q">Which vaccines are available at the clinic? <i className="ti ti-plus"></i></div>
                <div className="faq-a"><div className="faq-a-inner">We stock all IAP-recommended vaccines including BCG, Hepatitis B, OPV, DTP, Hib, Rotavirus, PCV, Varicella, MMR, Typhoid, Hepatitis A, and HPV. Please call ahead to confirm availability of a specific vaccine.</div></div>
              </div>
              <div className="faq-item">
                <div className="faq-q">What should I do in a paediatric emergency? <i className="ti ti-plus"></i></div>
                <div className="faq-a"><div className="faq-a-inner">For life-threatening emergencies, please go directly to the nearest hospital emergency room or call 108. For urgent but non-emergency situations — high fever, breathing concerns, severe rash — call us immediately at 077025 17340 and we will guide you.</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  ─── FINAL CTA ───────────────────────────────────────────────  */}
      <div className="final-cta">
        <div className="container">
          <div className="fade-in">
            <h2>Give Your Child the Gift of Expert Paediatric Care</h2>
            <p>Join hundreds of Hyderabad families who trust Dr. Piyush Agarwal for every milestone, vaccination, and healing moment in their child's life.</p>
            <div className="final-cta-btns">
              <a href="#!" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }} className="btn btn-white btn-lg"><i className="ti ti-calendar-plus"></i> Book Appointment — ₹300</a>
              <a href="https://wa.me/917702517340?text=Hello%20Dr.%20Piyush%20Clinic%2C%20I%20would%20like%20to%20book%20an%20appointment" target="_blank" rel="noopener noreferrer" className="btn btn-amber btn-lg"><i className="ti ti-brand-whatsapp"></i> WhatsApp Us</a>
            </div>
          </div>
        </div>
      </div>

      {/*  ─── CONTACT & MAP ───────────────────────────────────────────  */}
      <section id="contact" className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="fade-in-left">
              <div className="tag">Find Us</div>
              <h2>Visit the Clinic</h2>
              <div className="contact-item">
                <div className="ci-icon"><i className="ti ti-map-pin"></i></div>
                <div className="ci-content">
                  <div className="ci-label">Address</div>
                  <div className="ci-val">1-2-62/401, Street No. 6<br />Near Bank of Baroda, Above Yogesh Medicines<br />Himayatnagar, Hyderabad — 500029</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="ci-icon"><i className="ti ti-phone"></i></div>
                <div className="ci-content">
                  <div className="ci-label">Phone</div>
                  <div className="ci-val"><a href="tel:07702517340">077025 17340</a></div>
                </div>
              </div>
              <div className="contact-item">
                <div className="ci-icon"><i className="ti ti-brand-whatsapp"></i></div>
                <div className="ci-content">
                  <div className="ci-label">WhatsApp</div>
                  <div className="ci-val"><a href="https://wa.me/917702517340" target="_blank" rel="noopener noreferrer">+91 77025 17340</a></div>
                </div>
              </div>
              <div className="contact-item">
                <div className="ci-icon"><i className="ti ti-currency-rupee"></i></div>
                <div className="ci-content">
                  <div className="ci-label">Consultation Fee</div>
                  <div className="ci-val">₹300 per visit</div>
                </div>
              </div>
              <h3 style={{margin: '28px 0 16px', fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '14px', fontWeight: '600', color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '.06em'}}>Clinic Hours</h3>
              <div className="hours-grid">
                <div className="hours-card">
                  <div className="hc-day">Mon – Sat (Morning)</div>
                  <div className="hc-time">9:00 AM – 1:00 PM</div>
                </div>
                <div className="hours-card">
                  <div className="hc-day">Mon – Sat (Evening)</div>
                  <div className="hc-time">5:00 PM – 8:00 PM</div>
                </div>
                <div className="hours-card">
                  <div className="hc-day">Sunday</div>
                  <div className="hc-time">12:00 PM – 4:00 PM</div>
                </div>
                <div className="hours-card" style={{background: 'var(--amb-lt)', borderColor: 'var(--amb)'}}>
                  <div className="hc-day" style={{color: 'var(--amb2)'}}>Teleconsult</div>
                  <div className="hc-time">On Request</div>
                </div>
              </div>
              <div style={{display: 'flex', gap: '12px', marginTop: '28px', flexWrap: 'wrap'}}>
                <a href="https://wa.me/917702517340?text=Hello%20Dr.%20Piyush%20Clinic%2C%20I%20would%20like%20to%20book%20an%20appointment" target="_blank" rel="noopener noreferrer" className="btn btn-primary"><i className="ti ti-brand-whatsapp"></i> Book via WhatsApp</a>
                <a href="https://www.google.com/maps/dir/?api=1&destination=17.4043497,78.4848635" target="_blank" rel="noopener noreferrer" className="btn btn-outline"><i className="ti ti-navigation"></i> Get Directions</a>
              </div>
            </div>
            <div className="map-wrap fade-in-right">
              <iframe
                src="https://maps.google.com/maps?q=17.4043497,78.4848635&z=16&output=embed"
                loading="lazy"
                title="Dr. Piyush Pediatric Clinic Location"
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
