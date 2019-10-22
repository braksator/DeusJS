var decomment = require('decomment');
var fs = require('fs');

function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

fs.readFile('./deus.js', function (err, data) {
  if (err) throw err; 
  var code = data.toString();
  var len = code.length;
  console.log(`Loaded deus.js (${len} bytes)`);
  code = decomment(code); 

  code = code.replace(/\s\s+/g, ' ');
  var ops = ['=', '==', '===', '!==', '!=', '&&', '||', ',', ';', ':', '[', ']', '(', ')', '{', '}', '>', '<', '?', '+', '*', '-', '/'];
  ops.forEach(op => {
    code = code.replace(new RegExp(' ' + escapeRegExp(op), 'g'), op);
    code = code.replace(new RegExp(escapeRegExp(op) + ' ', 'g'), op);
  });

  var reps = [
    [';}', '}'],
  ]
  reps.forEach(rep => {
    code = code.replace(new RegExp(escapeRegExp(rep[0]), 'g'), rep[1]);
  });

  code = code.replace(/\;$/, '');

  fs.writeFile('deus.min.js', code, (err) => {
    if (err) throw err;
    console.log(`Created deus.min.js (${code.length} bytes) [${~~((code.length / len) * 100)}% of original]`);
  });
});
