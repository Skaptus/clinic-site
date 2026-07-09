const fs = require('fs');
const htmlContent = fs.readFileSync('C:\\Users\\vaishali\\OneDrive\\Desktop\\Dr. Piyush\\UI\\dr_piyush_landing.html', 'utf8');

// Extract CSS
const styleMatch = htmlContent.match(/<style>([\s\S]*?)<\/style>/);
if (styleMatch) {
    let css = styleMatch[1];
    fs.writeFileSync('C:\\Users\\vaishali\\OneDrive\\Desktop\\Dr. Piyush\\my-web\\src\\App.css', css);
}

// Extract Body
let bodyMatch = htmlContent.match(/<body>([\s\S]*?)<\/body>/);
if (bodyMatch) {
    let body = bodyMatch[1];
    
    body = body.replace(/class=/g, 'className=');
    body = body.replace(/for=/g, 'htmlFor=');
    body = body.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');
    body = body.replace(/<img([^>]+)>/g, (match) => {
        if (!match.endsWith('/>')) {
            return match.slice(0, -1) + ' />';
        }
        return match;
    });
    body = body.replace(/<br>/g, '<br />');
    body = body.replace(/<input([^>]+)>/g, (match) => {
        if (!match.endsWith('/>')) {
            return match.slice(0, -1) + ' />';
        }
        return match;
    });
    body = body.replace(/<hr>/g, '<hr />');
    
    body = body.replace(/style="([^"]+)"/g, (match, p1) => {
        const styles = p1.split(';').filter(s => s.trim().length > 0).map(s => {
            const [key, ...values] = s.split(':');
            const camelKey = key.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
            const value = values.join(':').trim().replace(/'/g, "\"");
            return `${camelKey}: '${value}'`;
        }).join(', ');
        return `style={{${styles}}}`;
    });
    
    body = body.replace(/<script>[\s\S]*?<\/script>/g, '');
    
    body = body.replace(/fill-rule=/g, 'fillRule=');
    body = body.replace(/clip-rule=/g, 'clipRule=');
    body = body.replace(/allowfullscreen/gi, 'allowFullScreen');
    
    body = body.replace(/onclick="loadVideo\(\)"/gi, 'onClick={loadVideo}');
    
    body = body.replace(/onerror="this\.style\.display='none'"/gi, 'onError={(e) => { e.target.style.display = \'none\'; }}');

    const jsx = `import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    const HEADER_OFFSET = 80;

    function smoothScrollTo(targetId) {
      const el = document.getElementById(targetId);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const absoluteTop = rect.top + window.pageYOffset - HEADER_OFFSET;
      window.scrollTo({ top: absoluteTop, behavior: 'smooth' });
    }

    const handleNavClick = function(e) {
      e.preventDefault();
      const target = this.getAttribute('data-target') || this.getAttribute('href').replace('#','');
      smoothScrollTo(target);
      const mobileMenu = document.getElementById('mobile-menu');
      if(mobileMenu) mobileMenu.classList.remove('open');
      const hamburger = document.getElementById('hamburger');
      if(hamburger) hamburger.setAttribute('aria-expanded','false');
    };

    document.querySelectorAll('.nav-scroll').forEach(link => {
      link.addEventListener('click', handleNavClick);
    });

    const header = document.getElementById('main-header');
    const handleScroll = () => {
      if(header) header.classList.toggle('scrolled', window.pageYOffset > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const handleHamburgerClick = () => {
      if(mobileMenu) {
        const isOpen = mobileMenu.classList.toggle('open');
        if(hamburger) hamburger.setAttribute('aria-expanded', isOpen);
      }
    };
    if(hamburger) hamburger.addEventListener('click', handleHamburgerClick);

    const handleFaqClick = function() {
      const item = this.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    };
    document.querySelectorAll('.faq-q').forEach(q => {
      q.addEventListener('click', handleFaqClick);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach((el, i) => {
      el.style.transitionDelay = \`\${(i % 4) * 0.08}s\`;
      observer.observe(el);
    });

    const sections = ['home','about','vaccinations','gallery','services','reviews','faq','contact'];
    const navLinksList = document.querySelectorAll('header .nav-links .nav-scroll');

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinksList.forEach(link => {
            link.style.color = link.getAttribute('data-target') === id ? 'var(--pur)' : '';
            link.style.background = link.getAttribute('data-target') === id ? 'var(--pur-xlt)' : '';
          });
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });

    return () => {
      document.querySelectorAll('.nav-scroll').forEach(link => {
        link.removeEventListener('click', handleNavClick);
      });
      window.removeEventListener('scroll', handleScroll);
      if(hamburger) hamburger.removeEventListener('click', handleHamburgerClick);
      document.querySelectorAll('.faq-q').forEach(q => {
        q.removeEventListener('click', handleFaqClick);
      });
      observer.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  const loadVideo = () => {
    const thumb = document.getElementById('video-thumb');
    const iframe = document.getElementById('clinic-video');
    const src = iframe.getAttribute('data-src');
    if (src && src.includes('your-video-id')) {
      thumb.innerHTML = \`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:16px;background:linear-gradient(135deg,#3D2150,#6D4A7C)">
        <i className="ti ti-video" style="font-size:56px;color:rgba(255,255,255,0.4)"></i>
        <p style="color:rgba(255,255,255,0.6);font-size:15px;text-align:center;padding:0 24px">Video coming soon! Please visit the clinic in person or contact us on WhatsApp.</p>
        <a href="https://wa.me/917702517340" target="_blank" style="background:var(--amb);color:#fff;padding:12px 28px;border-radius:50px;font-weight:600;font-size:14px;text-decoration:none">Chat on WhatsApp</a>
      </div>\`;
      return;
    }
    iframe.setAttribute('src', src);
    thumb.style.display = 'none';
    iframe.style.display = 'block';
  };

  return (
    <>
      ${body}
    </>
  );
}

export default App;
`;

    fs.writeFileSync('C:\\Users\\vaishali\\OneDrive\\Desktop\\Dr. Piyush\\my-web\\src\\App.jsx', jsx);
    console.log('Conversion successful!');
} else {
    console.log('Failed to find body tag.');
}
