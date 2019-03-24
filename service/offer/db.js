const mongoose = require('mongoose');
const config = require('./config');

const connectionString = `mongodb://${global.gConfig.db_host}:${global.gConfig.db_port}/${global.gConfig.db_name}`;
console.log(connectionString);
mongoose.connect(connectionString, { useNewUrlParser: true, useFindAndModify: false });