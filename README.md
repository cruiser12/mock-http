# mock-http

mocking nodejs http requests including expected responses 



features:

 * replace directly for ```require('http')```
 * use together with [mockery](https://github.com/mfncooper/mockery)
 * pass the expected response as parameter
 * very helpful when testing libraries that use http.request or http.get
 * works with buffers also


usage: (with mockery)


```javascript
var expect = require('chai').expect;

var mockery = require('mockery');
var mockHttp = require('mock_http');

var response = 
  {
    statusCode : 200,
    statusMessage : 'OK', // as message body
    data : require('fs').readFileSync('any.xml') // or as buffer 
  };

mockery.registerMock('http', mockHttp(response));
mockery.enable({warnOnReplace: false, warnOnUnregistered: false, useCleanCache: true});

// our 'lib/any' has a http.get inside, that gets replaces with our mockHttp
require('lib/any')({}, function(err,result)
{
  	expect(err).to.be.null;

  	mockery.disable();
  	mockery.deregisterMock('http');

	return false;
});

```

### TODO:

* complete all [http_client](https://github.com/joyent/node/blob/master/lib/_http_client.js) features