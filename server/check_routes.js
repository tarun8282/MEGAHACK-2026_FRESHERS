const fs = require('fs');
const path = require('path');

const routes = [
    './src/routes/auth.js',
    './src/routes/complaints.js',
    './src/routes/alerts.js',
    './src/routes/cities.js'
];

let log = '';

routes.forEach(route => {
    try {
        require(route);
        log += `SUCCESS: ${route}\n`;
    } catch (err) {
        log += `FAILURE: ${route}\n${err.stack}\n\n`;
    }
});

fs.writeFileSync('route_check.log', log);
console.log('Check complete. See route_check.log');
