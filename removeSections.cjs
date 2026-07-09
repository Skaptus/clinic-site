const fs = require('fs');

let appJsx = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Remove Vaccinations Section
appJsx = appJsx.replace(/\{\/\*  ─── VACCINATIONS ────────────────────────────────────────────  \*\/\}[\s\S]*?<section id="vaccinations"[\s\S]*?<\/section>/g, '');

// 2. Remove FAQ Section
appJsx = appJsx.replace(/\{\/\*  ─── FAQ ─────────────────────────────────────────────────────  \*\/\}[\s\S]*?<section id="faq"[\s\S]*?<\/section>/g, '');

// 3. Remove Navigation Links for Vaccinations and FAQ
appJsx = appJsx.replace(/<li><a href="#vaccinations"[^>]*>.*?<\/a><\/li>/g, '');
appJsx = appJsx.replace(/<li><a href="#faq"[^>]*>.*?<\/a><\/li>/g, '');

// 4. Remove Footer Quick Links for Vaccinations and FAQ
appJsx = appJsx.replace(/<li><a href="#vaccinations"[^>]*>Vaccinations<\/a><\/li>/g, '');
appJsx = appJsx.replace(/<li><a href="#faq"[^>]*>FAQ<\/a><\/li>/g, '');

// 5. Remove Phone Number in Header and Mobile Menu
appJsx = appJsx.replace(/<div className="nav-phone">.*?<\/div>/g, '');
appJsx = appJsx.replace(/<div className="m-phone">.*?<\/div>/g, '');

// 6. Remove Call Buttons (tel: links)
appJsx = appJsx.replace(/<a href="tel:[0-9]+"[^>]*>.*?<\/a>/g, '');

// 7. Remove Phone Contact Item in Contact Section
const contactPhoneRegex = /<div className="contact-item">\s*<div className="ci-icon"><i className="ti ti-phone"><\/i><\/div>\s*<div className="ci-content">\s*<div className="ci-label">Phone<\/div>\s*<div className="ci-val">.*?<\/div>\s*<\/div>\s*<\/div>/g;
appJsx = appJsx.replace(contactPhoneRegex, '');

// 8. Remove Phone item in Footer
appJsx = appJsx.replace(/<div className="footer-contact-item"><i className="ti ti-phone"><\/i><span>.*?<\/span><\/div>/g, '');

// 9. Update the intersection observer sections array
appJsx = appJsx.replace(/'vaccinations',/g, '');
appJsx = appJsx.replace(/'faq',/g, '');
appJsx = appJsx.replace(/,'faq'/g, '');

fs.writeFileSync('src/App.jsx', appJsx);
console.log('Removed successfully.');
