const fs = require('fs');

// 1. Update App.jsx
let appJsx = fs.readFileSync('src/App.jsx', 'utf8');

// Add state import if not present
if (!appJsx.includes('useState')) {
    appJsx = appJsx.replace(/import React, { useEffect } from 'react';/, "import React, { useEffect, useState } from 'react';");
}

// Add state to App component
if (!appJsx.includes('const [isModalOpen, setIsModalOpen]')) {
    appJsx = appJsx.replace(/function App\(\) {\n/, "function App() {\n  const [isModalOpen, setIsModalOpen] = useState(false);\n");
}

// Replace 'nav-scroll' anchors with data-target="contact" that are acting as buttons.
// Note: We don't want to replace the actual header nav link "Contact", so we'll just replace the ones that are buttons (btn, nav-book).
appJsx = appJsx.replace(/<a href="#contact" className="([^"]*(?:btn|nav-book)[^"]*)"(?: data-target="contact")?>([\s\S]*?)<\/a>/g, 
    '<a href="#!" className="$1" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}>$2</a>');

// Also catch nav-scroll data-target="contact" which might be matched
appJsx = appJsx.replace(/<a href="#contact" className="([^"]*nav-scroll[^"]*)" data-target="contact">([\s\S]*?)<\/a>/g, (match, p1, p2) => {
    // If it's just the header or mobile menu li link, we might want to keep it scrolling to contact. 
    // The user said "book appointment box", which means the buttons. 
    // Let's check if it contains 'Book Appointment' or 'Schedule'.
    if (p2.includes('Book') || p2.includes('Schedule')) {
        return `<a href="#!" className="${p1.replace('nav-scroll', '')}" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}>${p2}</a>`;
    }
    return match;
});

// The previous replace for 'btn' and 'nav-book' was missing the data-target removal so it might have left nav-scroll.
// Let's do a more robust global replace for any <a> tag that contains "Book Appointment" or "Schedule" and has href="#contact".
appJsx = appJsx.replace(/<a href="#contact"[^>]*>([^<]*(?:Book|Schedule)[^<]*)<\/a>/g, (match) => {
    return match.replace('href="#contact"', 'href="#!" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}');
});

// Let's just do a manual replace of href="#contact" where the text inside the anchor or its children has 'Book' or 'Schedule'
appJsx = appJsx.replace(/<a href="#contact"([^>]*)>([\s\S]*?)<\/a>/g, (match, attrs, content) => {
    if (content.includes('Book') || content.includes('Schedule')) {
        let newAttrs = attrs.replace(/data-target="contact"/, '').replace(/nav-scroll/, '');
        return `<a href="#!" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}${newAttrs}>${content}</a>`;
    }
    return match;
});

// Add the Modal JSX right before the closing </> of App component
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
              <button type="submit" className="btn btn-primary" style={{width: '100%', justifyContent: 'center', marginTop: '10px'}}>Submit Request</button>
            </form>
          </div>
        </div>
      )}
`;

if (!appJsx.includes('BOOKING MODAL')) {
    appJsx = appJsx.replace(/<\/>\s*\);\s*}\s*export default App;/, modalJsx + '\n    </>\n  );\n}\n\nexport default App;');
}

fs.writeFileSync('src/App.jsx', appJsx);

// 2. Update App.css or index.css to add Modal styles
let cssFile = 'src/index.css';
let css = fs.readFileSync(cssFile, 'utf8');

const modalStyles = `
/* --- Modal Styles --- */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: #fff;
  width: 100%;
  max-width: 500px;
  border-radius: var(--radius-lg);
  padding: 32px;
  box-shadow: var(--shadow-lg);
  position: relative;
  animation: slideUp 0.3s ease;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.modal-header h3 {
  margin: 0;
  font-size: 24px;
  color: var(--pur);
}

.modal-close {
  background: none;
  border: none;
  font-size: 28px;
  line-height: 1;
  color: var(--txt3);
  cursor: pointer;
  transition: color 0.2s;
}

.modal-close:hover {
  color: var(--txt);
}

.modal-form .form-group {
  margin-bottom: 16px;
}

.modal-form label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--txt2);
  margin-bottom: 8px;
}

.modal-form input,
.modal-form select {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: var(--radius);
  font-family: inherit;
  font-size: 15px;
  color: var(--txt);
  transition: border-color 0.2s;
}

.modal-form input:focus,
.modal-form select:focus {
  outline: none;
  border-color: var(--pur);
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

if (!css.includes('.modal-overlay')) {
    fs.appendFileSync(cssFile, '\n' + modalStyles);
}

console.log('Modal added successfully');
