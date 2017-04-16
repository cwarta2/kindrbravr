// didn't get to implement this,
// but was going to analyze the
// tone of the speakers too.
var request = require('request-promise');
var fs = require('fs');
var sorryMsg = 'Sorry, nothing to stream for now...';

(function tick() {
  request.get('http://www.streamtext.net/text-data.ashx?event=CascadiaFest&last=2&language=en')
  .then(function(v) {
      v = JSON.parse(v);
      if (v.i && v.i.length) {
        fs.writeFile('speakers.txt', v.i.map(function(v) {
          return decodeURIComponent(v.d);
        }).join(''));
      }
  })
  .catch(function(err){
    if(err.statusCode === 404) {
      process.stdout.write(sorryMsg);
      sorryMsg = '.';
    }
  })
  .finally(setTimeout.bind({}, tick, 1000));
})(null);

