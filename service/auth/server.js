const ENV = process.env.NODE_ENV || 'development';

require('@google-cloud/trace-agent').start();

require('custom-env').env(ENV);

require('module-alias/register');
require('@conf/db');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors');
const expressValidator = require('express-validator');
const Eureka = require('eureka-js-client').Eureka;
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressValidator());

// required for passport
app.use(passport.initialize());
app.use(passport.session());
require('@conf/passport')(passport);

// We won't include the Eureka client in testing
if (ENV === 'test') {
  require('./app/routes')(app);
} else {
  const client = new Eureka({
    // Application instance information
    instance: {
      app: 'auth-service',
      hostName: process.env.EUREKA_CLIENT_HOST || 'localhost',
      ipAddr: '127.0.0.1',
      statusPageUrl: (process.env.EUREKA_CLIENT_URL || 'http://localhost:') + PORT,
      vipAddress: 'auth-service',
      port: {
        $: PORT,
        '@enabled': 'true',
      },
      dataCenterInfo: {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn',
      },
      registerWithEureka: true,
      fetchRegistry: true,
      leaseRenewalIntervalInSeconds: 1,
      leaseExpirationDurationInSeconds: 2
    },
    eureka: {
      // Eureka server
      host: process.env.EUREKA_SERVER_HOST || 'localhost',
      port: process.env.EUREKA_SERVER_PORT || 8761,
      servicePath: '/eureka/apps/',
    },
  });
  client.logger.level('debug');
  client.start(error => {
    console.log(error || 'Eureka client started');
    require('./app/routes')(app);
  });
}

app.listen(PORT);
console.log('Auth service is listening on port: ' + PORT);

module.exports = app;