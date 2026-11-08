const fs = require('fs');
const html = fs.readFileSync('topics/seryestar/index.html', 'utf8');
const scriptMatches = html.match(/<script>([\s\S]*?)<\/script>/gi);
console.log('Script tags count:', scriptMatches ? scriptMatches.length : 0);
if (scriptMatches) {
  scriptMatches.forEach((s, idx) => {
    const code = s.replace(/<\/?script>/gi, '');
    try {
      new Function(code);
      console.log('Script ' + idx + ' syntax OK');
    } catch(e) {
      console.error('Script ' + idx + ' syntax error:', e.message);
    }
  });
}
