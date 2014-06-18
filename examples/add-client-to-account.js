var fs         = require('fs');
var KeyUtils   = require('../lib/key-utils');
var HOME       = process.env['HOME'];
var BitPay     = require('../lib/rest-client');
var encPrivkey = fs.readFileSync(HOME + '/.bp/api.key').toString();
var config     = require('../config');
var privkey    = KeyUtils.decrypt(config.keyPassword, encPrivkey);

var client = new BitPay();

var data = {
  email: 'gordon@bitpay.com',
  id: KeyUtils.getSin(privkey),
  label: 'my nodejs app'
};

client.as('public').post('clients', data, function(err, data) {
  console.log(err || data);
});