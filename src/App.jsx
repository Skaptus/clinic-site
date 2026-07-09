import { useEffect, useState, useLayoutEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Home, smoothScrollTo } from './pages/Home';
import { BlogList } from './pages/BlogList';
import { BlogPost } from './pages/BlogPost';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfUse } from './pages/TermsOfUse';
import { ServiceDetail } from './pages/ServiceDetail';
import iconWhatsapp from './assets/icon_whatsapp.png';
import iconFacebook from './assets/icon_facebook.png';
import iconGoogleMap from './assets/icon_googlemap.png';
import iconInstagram from './assets/icon_instagram.png';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [appointmentType, setAppointmentType] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Open booking modal if query parameter ?book=true is present
  useEffect(() => {
    if (searchParams.get('book') === 'true') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsModalOpen(true);
      const typeParam = searchParams.get('type');
      if (typeParam) {
        setAppointmentType(typeParam);
      }
    }
  }, [searchParams]);

  // Scroll to top on page transitions (if no hash)
  useLayoutEffect(() => {
    if (!location.hash) {
      const originalScrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = 'auto';
      // Force layout flush
      document.documentElement.offsetHeight;
      window.scrollTo(0, 0);
      document.documentElement.style.scrollBehavior = originalScrollBehavior;
    }
  }, [location.pathname]);

  // Manage header background and mobile hamburger menu
  useEffect(() => {
    const header = document.getElementById('main-header');
    const handleScroll = () => {
      if (header) header.classList.toggle('scrolled', window.pageYOffset > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const handleHamburgerClick = () => {
      if (mobileMenu) {
        const isOpen = mobileMenu.classList.toggle('open');
        if (hamburger) hamburger.setAttribute('aria-expanded', isOpen);
      }
    };
    if (hamburger) hamburger.addEventListener('click', handleHamburgerClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hamburger) hamburger.removeEventListener('click', handleHamburgerClick);
    };
  }, []);

  const handleNavLinkClick = (e, targetId) => {
    e.preventDefault();
    if (location.pathname === '/') {
      smoothScrollTo(targetId);
    } else {
      navigate('/', { state: { scrollTo: targetId } });
    }
    closeMobileMenu();
  };

  const closeMobileMenu = () => {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) mobileMenu.classList.remove('open');
    const hamburger = document.getElementById('hamburger');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
  };

  return (
    <>
      {/*  ─── HEADER ────────────────────────────────────────────────  */}
      <header id="main-header">
        <div className="container nav-inner">
          <Link to="/" onClick={closeMobileMenu}>
            <div className="nav-logo">
              <span className="name">Dr. Piyush Pediatric Clinic</span>
              <span className="sub">Himayatnagar · Hyderabad</span>
            </div>
          </Link>
          <ul className="nav-links" style={{ marginLeft: 'auto', marginRight: '16px' }}>
            <li><a href="#home" className="nav-scroll" data-target="home" onClick={(e) => handleNavLinkClick(e, 'home')}>Home</a></li>
            <li><a href="#about" className="nav-scroll" data-target="about" onClick={(e) => handleNavLinkClick(e, 'about')}>About</a></li>
            <li><a href="#services" className="nav-scroll" data-target="services" onClick={(e) => handleNavLinkClick(e, 'services')}>Services</a></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><a href="#reviews" className="nav-scroll" data-target="reviews" onClick={(e) => handleNavLinkClick(e, 'reviews')}>Reviews</a></li>
            <li><a href="#contact" className="nav-scroll" data-target="contact" onClick={(e) => handleNavLinkClick(e, 'contact')}>Contact</a></li>
          </ul>
          <div className="nav-cta">
            <a href="#!" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }} className="nav-book">Book Appointment</a>
          </div>
          <div className="hamburger" id="hamburger" aria-label="Open menu">
            <span></span><span></span><span></span>
          </div>
        </div>
      </header>

      {/*  Mobile Menu  */}
      <div className="mobile-menu" id="mobile-menu">
        <ul>
          <li><a href="#home" className="nav-scroll" data-target="home" onClick={(e) => handleNavLinkClick(e, 'home')}>Home</a></li>
          <li><a href="#about" className="nav-scroll" data-target="about" onClick={(e) => handleNavLinkClick(e, 'about')}>About Dr. Piyush</a></li>
          <li><a href="#services" className="nav-scroll" data-target="services" onClick={(e) => handleNavLinkClick(e, 'services')}>Services</a></li>
          <li><Link to="/blog" onClick={closeMobileMenu}>Blog</Link></li>
          <li><a href="#reviews" className="nav-scroll" data-target="reviews" onClick={(e) => handleNavLinkClick(e, 'reviews')}>Reviews</a></li>
          <li><a href="#contact" className="nav-scroll" data-target="contact" onClick={(e) => handleNavLinkClick(e, 'contact')}>Contact</a></li>
        </ul>
        <div className="m-phone"><i className="ti ti-phone"></i> 077025 17340</div>
        <a href="#!" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }} className="btn btn-primary" style={{width: '100%', justifyContent: 'center'}}>Book Appointment</a>
      </div>

      {/*  ─── ROUTED CONTENT ───────────────────────────────────────  */}
      <main style={{ minHeight: 'calc(100vh - var(--nav-h) - 400px)', paddingTop: 'var(--nav-h)' }}>
        <Routes>
          <Route path="/" element={<Home setIsModalOpen={setIsModalOpen} />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost setIsModalOpen={setIsModalOpen} />} />
          <Route path="/services/:slug" element={<ServiceDetail setIsModalOpen={setIsModalOpen} setAppointmentType={setAppointmentType} />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
        </Routes>
      </main>

      {/*  ─── FOOTER ──────────────────────────────────────────────────  */}
      <footer>
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand">
              <div className="fb-name">Dr. Piyush Pediatric Clinic</div>
              <div className="fb-sub">Trusted Paediatric Care · Hyderabad</div>
              <p>Compassionate, expert paediatric care for children of all ages in the heart of Himayatnagar. Backed by experience, driven by empathy.</p>
              <div className="footer-social" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <a href="https://www.google.com/maps/dir/?api=1&destination=17.4043497,78.4848635" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.transform='scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform='scale(1)'} title="Google Maps"><img src={iconGoogleMap} alt="Google Maps" style={{width: '44px', height: '44px', objectFit: 'contain', display: 'block'}} /></a>
                <a href="https://wa.me/917702517340" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.transform='scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform='scale(1)'} title="WhatsApp"><img src={iconWhatsapp} alt="WhatsApp" style={{width: '44px', height: '44px', objectFit: 'contain', display: 'block'}} /></a>
                <a href="https://www.instagram.com/dr.piyush_pediatricclinic/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.transform='scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform='scale(1)'} title="Instagram"><img src={iconInstagram} alt="Instagram" style={{width: '44px', height: '44px', objectFit: 'contain', display: 'block'}} /></a>
                <a href="https://www.facebook.com/share/1ET7fyNCtp/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.transform='scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform='scale(1)'} title="Facebook"><img src={iconFacebook} alt="Facebook" style={{width: '44px', height: '44px', objectFit: 'contain', display: 'block'}} /></a>
              </div>
            </div>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home" className="nav-scroll" data-target="home" onClick={(e) => handleNavLinkClick(e, 'home')}>Home</a></li>
                <li><a href="#about" className="nav-scroll" data-target="about" onClick={(e) => handleNavLinkClick(e, 'about')}>About Dr. Piyush</a></li>
                <li><a href="#services" className="nav-scroll" data-target="services" onClick={(e) => handleNavLinkClick(e, 'services')}>Services</a></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><a href="#reviews" className="nav-scroll" data-target="reviews" onClick={(e) => handleNavLinkClick(e, 'reviews')}>Reviews</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Services</h4>
              <ul>
                <li><a href="#services" className="nav-scroll" data-target="services" onClick={(e) => handleNavLinkClick(e, 'services')}>Well-Baby Check-ups</a></li>
                <li><a href="#services" className="nav-scroll" data-target="services" onClick={(e) => handleNavLinkClick(e, 'services')}>Newborn Care</a></li>
                <li><a href="#services" className="nav-scroll" data-target="services" onClick={(e) => handleNavLinkClick(e, 'services')}>Fever Treatment</a></li>
                <li><a href="#services" className="nav-scroll" data-target="services" onClick={(e) => handleNavLinkClick(e, 'services')}>Development Screening</a></li>
                <li><a href="#services" className="nav-scroll" data-target="services" onClick={(e) => handleNavLinkClick(e, 'services')}>Teleconsultation</a></li>
                <li><a href="#services" className="nav-scroll" data-target="services" onClick={(e) => handleNavLinkClick(e, 'services')}>Nutrition Counseling</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <div className="footer-contact-item"><i className="ti ti-map-pin"></i><span>1-2-62/401, Street No. 6, Near Bank of Baroda, Himayatnagar, Hyderabad — 500029</span></div>
              <div className="footer-contact-item"><i className="ti ti-phone"></i><span>077025 17340</span></div>
              <div className="footer-contact-item"><i className="ti ti-brand-whatsapp"></i><span>+91 77025 17340</span></div>
              <div className="footer-contact-item"><i className="ti ti-clock"></i><span>Mon–Sat: 9–1 AM &amp; 5–8 PM<br />Sunday: 12–4 PM</span></div>
              <div className="footer-contact-item"><i className="ti ti-currency-rupee"></i><span>Consultation: ₹300</span></div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Dr. Piyush Pediatric Clinic, Hyderabad. All rights reserved.</p>
            <div className="footer-bottom-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Use</Link>
              <a href="#contact" className="nav-scroll" data-target="contact" onClick={(e) => handleNavLinkClick(e, 'contact')}>Contact Us</a>
            </div>
          </div>
        </div>
      </footer>

      {/*  ─── WHATSAPP WIDGET ─────────────────────────────────────────  */}
      <div className="wa-float">
        <div className="wa-tooltip">Chat with us on WhatsApp</div>
        <a href="https://wa.me/917702517340?text=Hello%20Dr.%20Piyush%20Clinic%2C%20I%20would%20like%20to%20book%20an%20appointment" target="_blank" rel="noopener noreferrer" className="wa-btn" aria-label="Chat on WhatsApp">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
      </div>

      {/* ─── BOOKING MODAL ─────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => { setIsModalOpen(false); setIsFormSubmitted(false); setAppointmentType(''); if (searchParams.get('book') === 'true') { navigate(location.pathname, { replace: true }); } }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Book an Appointment</h3>
              <button className="modal-close" onClick={() => { setIsModalOpen(false); setIsFormSubmitted(false); setAppointmentType(''); if (searchParams.get('book') === 'true') { navigate(location.pathname, { replace: true }); } }}>&times;</button>
            </div>
            {isFormSubmitted ? (
              <p className="success-message" style={{ padding: '24px', textAlign: 'center', color: '#16a34a', fontSize: '18px', fontWeight: '500', lineHeight: '1.5' }}>
                Appointment request submitted successfully.<br />
                Our clinic team will contact you shortly.
              </p>
            ) : (
              <form className="modal-form appointment-form" action="https://formspree.io/f/meenyajp" method="POST" onSubmit={async (e) => { 
                e.preventDefault(); 
                const form = e.target;
                try {
                  const response = await fetch(form.action, {
                    method: form.method,
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                  });
                  if (response.ok) setIsFormSubmitted(true);
                  else alert('Oops! There was a problem submitting your form');
                } catch {
                  alert('Oops! There was a problem submitting your form');
                }
              }}>
                <div className="form-group">
                  <label>Parent Name</label>
                  <input type="text" name="parent_name" placeholder="Parent Name" required />
                </div>
                <div className="form-group">
                  <label>Child Name</label>
                  <input type="text" name="child_name" placeholder="Child Name" required />
                </div>
                <div className="form-group">
                  <label>Parent Phone Number</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <select name="country_code" defaultValue="+91" required style={{ width: '100px', flexShrink: 0, padding: '12px 8px' }}>
                      <option value="+91">+91 (IN)</option>
                      <option value="+1">+1 (US)</option>
                      <option value="+44">+44 (UK)</option>
                      <option value="+61">+61 (AU)</option>
                      <option value="+971">+971 (AE)</option>
                    </select>
                    <input type="tel" id="phone" name="phone" placeholder="Phone Number" pattern="[0-9]{10}" required style={{ flex: 1 }} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Child Age</label>
                  <input type="number" name="child_age" placeholder="Child Age" min="0" max="18" required />
                </div>
                <div className="form-group full-width">
                  <label>Appointment Date</label>
                  <input type="date" name="appointment_date" required />
                </div>
                <div className="form-group full-width">
                  <label>Appointment Type</label>
                  <select 
                    name="appointment_type" 
                    value={appointmentType} 
                    onChange={(e) => setAppointmentType(e.target.value)} 
                    required
                  >
                    <option value="">Select Appointment Type</option>
                    <option value="General Checkup">General Checkup</option>
                    <option value="Vaccination">Vaccination</option>
                    <option value="Fever & Cold">Fever & Cold</option>
                    <option value="Nutrition Consultation">Nutrition Consultation</option>
                    <option value="Follow-up Visit">Follow-up Visit</option>
                    <option value="Teleconsultation">Teleconsultation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group full-width">
                  <label>Optional Concern</label>
                  <textarea name="concern" maxLength="250" placeholder="Optional: Briefly describe your concern" rows="3"></textarea>
                </div>
                <div className="form-group full-width payment-box" style={{ background: 'var(--pur-xlt)', padding: '16px', borderRadius: 'var(--radius)' }}>
                  <h3 style={{ margin: '0 0 4px', fontSize: '16px', color: 'var(--pur3)' }}>Consultation Fee</h3>
                  <p style={{ margin: '0 0 12px', fontWeight: '600', color: 'var(--txt)' }}>₹300</p>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', margin: 0, fontWeight: 'normal' }}>
                      <input type="radio" name="payment_status" value="Paid Online" required style={{ width: 'auto' }} />
                      Paid Online
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', margin: 0, fontWeight: 'normal' }}>
                      <input type="radio" name="payment_status" value="Pay At Clinic" style={{ width: 'auto' }} />
                      Pay At Clinic
                    </label>
                  </div>
                </div>
                
                {/* Spam Protection */}
                <input type="text" name="_gotcha" style={{ display: 'none' }} />

                <button type="submit" className="btn btn-primary" style={{width: '100%', justifyContent: 'center', marginTop: '10px'}}>Book Appointment</button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
