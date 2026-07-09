const fs = require('fs');

let appJsx = fs.readFileSync('src/App.jsx', 'utf8');

// Top Header Nav removals
appJsx = appJsx.replace(/<li><a href="#vaccinations" className="nav-scroll" data-target="vaccinations">Vaccinations<\/a><\/li>/g, '');
appJsx = appJsx.replace(/<li><a href="#faq" className="nav-scroll" data-target="faq">FAQ<\/a><\/li>/g, '');
appJsx = appJsx.replace(/<div className="nav-phone"><i className="ti ti-phone"><\/i> 077025 17340<\/div>/g, '');

// Mobile Menu Nav removals
appJsx = appJsx.replace(/<li style=\{\{opacity: 0\}\}><a href="#vaccinations" className="nav-scroll" data-target="vaccinations">Vaccinations<\/a><\/li>/g, '');
appJsx = appJsx.replace(/<li style=\{\{opacity: 0\}\}><a href="#faq" className="nav-scroll" data-target="faq">FAQ<\/a><\/li>/g, '');
appJsx = appJsx.replace(/<div className="m-phone" style=\{\{opacity: 0\}\}><i className="ti ti-phone"><\/i> 077025 17340<\/div>/g, '');

fs.writeFileSync('src/App.jsx', appJsx);
console.log('Successfully removed nav items.');
