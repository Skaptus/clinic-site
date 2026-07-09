const fs = require('fs');

let appJsx = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Imports
appJsx = appJsx.replace(/import React, { useEffect } from 'react';/, `import React, { useEffect, useState } from 'react';
import doctorImg from './assets/doctor.jpg';
import vaccineImg from './assets/vaccine.jpg';
import iconWhatsapp from './assets/icon_whatsapp.png';
import iconFacebook from './assets/icon_facebook.png';
import iconGoogleMap from './assets/icon_googlemap.png';
import iconInstagram from './assets/icon_instagram.png';`);

// 2. Add Modal State
appJsx = appJsx.replace(/function App\(\) {/, "function App() {\n  const [isModalOpen, setIsModalOpen] = useState(false);");

// 3. Instagram Reels replace video section & loadVideo function
appJsx = appJsx.replace(/const loadVideo = \(\) => {[\s\S]*?};\n/, '');
const reelsSection = `{/*  ─── INSTAGRAM REELS ───────────────────────────────────────────  */}
<section id="reels" className="video-section">
  <div className="container">
    <div className="video-head fade-in">
      <div className="tag" style={{background: 'rgba(162,119,179,.2)', color: 'var(--pur)'}}>Instagram Reels</div>
      <h2 style={{color: '#fff'}}>Helpful Tips from Dr. Piyush</h2>
      <p style={{color: 'rgba(255,255,255,.6)', maxWidth: '520px', margin: '0 auto'}}>Stay updated with our latest health tips, clinic moments, and child care advice.</p>
    </div>
    <div className="grid-3 fade-in" style={{marginTop: '48px'}}>
      {/* Reel 1 */}
      <div className="reel-wrap" style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,.5)', background: '#fff', height: '540px', position: 'relative'}}>
        <iframe src="https://www.instagram.com/reel/DRWOaBWEcF6/embed" style={{width: '100%', height: '100%', border: 'none'}} scrolling="no" allowTransparency="true" allow="encrypted-media"></iframe>
      </div>
      {/* Reel 2 */}
      <div className="reel-wrap" style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,.5)', background: '#fff', height: '540px', position: 'relative'}}>
        <iframe src="https://www.instagram.com/reel/DR9BJ4tka6m/embed" style={{width: '100%', height: '100%', border: 'none'}} scrolling="no" allowTransparency="true" allow="encrypted-media"></iframe>
      </div>
      {/* Reel 3 */}
      <div className="reel-wrap" style={{borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,.5)', background: '#fff', height: '540px', position: 'relative'}}>
        <iframe src="https://www.instagram.com/reel/DQEAbdUkRSZ/embed" style={{width: '100%', height: '100%', border: 'none'}} scrolling="no" allowTransparency="true" allow="encrypted-media"></iframe>
      </div>
    </div>
    <div style={{textAlign: 'center', marginTop: '48px'}} className="fade-in">
      <a href="https://www.instagram.com/dr.piyush_pediatricclinic/" target="_blank" rel="noopener noreferrer" className="btn btn-primary"><i className="ti ti-brand-instagram"></i> Follow us on Instagram</a>
    </div>
  </div>
</section>`;
appJsx = appJsx.replace(/\{\/\*  ─── VIDEO SECTION ───────────────────────────────────────────  \*\/\}[\s\S]*?<\/section>/, reelsSection);

// 4. Update Images (Doctor & Vaccine)
appJsx = appJsx.replace(/<img src="https:\/\/images\.unsplash\.com\/photo-1612349317150-e413f6a5b16d[^"]*" alt="Dr\. Piyush Agarwal - Pediatrician" \/>/, '<img src={doctorImg} alt="Dr. Piyush Agarwal - Pediatrician" style={{ objectPosition: "center 20%" }} />');
appJsx = appJsx.replace(/<img src="https:\/\/images\.unsplash\.com\/photo-1559757175-7cb057fba93c[^"]*" alt="Child vaccination" \/>/, '<img src={vaccineImg} alt="Child vaccination" />');

// 5. Update Footer Icons
const footerIcons = `<div className="footer-social" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <a href="https://www.google.com/maps/dir/?api=1&destination=17.4043497,78.4848635" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.transform='scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform='scale(1)'} title="Google Maps"><img src={iconGoogleMap} alt="Google Maps" style={{width: '44px', height: '44px', objectFit: 'contain', display: 'block'}} /></a>
          <a href="https://wa.me/917702517340" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.transform='scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform='scale(1)'} title="WhatsApp"><img src={iconWhatsapp} alt="WhatsApp" style={{width: '44px', height: '44px', objectFit: 'contain', display: 'block'}} /></a>
          <a href="https://www.instagram.com/dr.piyush_pediatricclinic/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.transform='scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform='scale(1)'} title="Instagram"><img src={iconInstagram} alt="Instagram" style={{width: '44px', height: '44px', objectFit: 'contain', display: 'block'}} /></a>
          <a href="https://www.facebook.com/share/1ET7fyNCtp/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.transform='scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform='scale(1)'} title="Facebook"><img src={iconFacebook} alt="Facebook" style={{width: '44px', height: '44px', objectFit: 'contain', display: 'block'}} /></a>
        </div>`;
const originalFooterIcons = `<div className="footer-social">
          <div className="f-social-btn" title="Google Maps"><i className="ti ti-brand-google"></i></div>
          <div className="f-social-btn" title="WhatsApp"><i className="ti ti-brand-whatsapp"></i></div>
          <div className="f-social-btn" title="Instagram"><i className="ti ti-brand-instagram"></i></div>
          <div className="f-social-btn" title="Facebook"><i className="ti ti-brand-facebook"></i></div>
        </div>`;
appJsx = appJsx.replace(originalFooterIcons, footerIcons);

// 6. Fix Book Appointment Links to use Modal
appJsx = appJsx.replace(/<a href="#contact"([^>]*)>([\s\S]*?)<\/a>/g, (match, attrs, content) => {
    if (content.includes('Book') || content.includes('Schedule')) {
        let newAttrs = attrs.replace(/data-target="contact"/, '').replace(/nav-scroll/, '');
        return `<a href="#!" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}${newAttrs}>${content}</a>`;
    }
    return match;
});

// 7. Append Modal Component
const modalJsx = `
      {/* ─── BOOKING MODAL ─────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Book an Appointment</h3>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <form className="modal-form" onSubmit={(e) => { e.preventDefault(); alert('Appointment Request Sent!'); setIsModalOpen(false); }}>
              <div className="form-group">
                <label>Parent's Name</label>
                <input type="text" placeholder="Enter your name" required />
              </div>
              <div className="form-group">
                <label>Child's Name & Age</label>
                <input type="text" placeholder="e.g. Rahul, 4 years" required />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="+91" required />
              </div>
              <div className="form-group">
                <label>Reason for Visit</label>
                <select required>
                  <option value="">Select a reason</option>
                  <option value="General Consultation">General Consultation</option>
                  <option value="Vaccination">Vaccination</option>
                  <option value="Fever/Illness">Fever / Illness</option>
                  <option value="Newborn Checkup">Newborn Checkup</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Preferred Date</label>
                <input type="date" required />
              </div>
              <div className="form-group">
                <label>Payment Preference</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
                  <label style={{ fontWeight: 'normal', color: 'var(--txt)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', margin: 0 }}>
                    <input type="radio" name="payment" value="online" required defaultChecked style={{ width: 'auto' }} />
                    <span>Pay ₹300 Online Now (UPI / Card)</span>
                  </label>
                  <label style={{ fontWeight: 'normal', color: 'var(--txt)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', margin: 0 }}>
                    <input type="radio" name="payment" value="clinic" required style={{ width: 'auto' }} />
                    <span>Pay at Clinic</span>
                  </label>
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{width: '100%', justifyContent: 'center', marginTop: '10px'}}>Proceed to Book</button>
            </form>
          </div>
        </div>
      )}
`;

appJsx = appJsx.replace(/<\/>\s*\);\s*}\s*export default App;/, modalJsx + '\n    </>\n  );\n}\n\nexport default App;');

fs.writeFileSync('src/App.jsx', appJsx);
console.log('Restored all features successfully!');
