const aws = require('aws-sdk');
const rds = new aws.RDS({
  region: process.env.AwsRegion
});
const co = require('co');
const thunkify = require('thunkify');
const log = process.env.Environment === 'develop' ? console.log : () => {};

const stopDBInstance = thunkify(rds.stopDBInstance.bind(rds));
exports.stop = (event, context, callback) => {
  log('stop', event);
  co(function* () {
    const result = yield stopDBInstance({
      DBInstanceIdentifier: process.env.RdsInstanceName
    });
    callback(null, result);
  }).catch(e => {
    console.log('Error occurred.', e);
    callback(e, null);
  });
};

const startDBInstance = thunkify(rds.startDBInstance.bind(rds));
exports.start = (event, context, callback) => {
  log('start', event);
  co(function* () {
    const result = yield startDBInstance({
      DBInstanceIdentifier: process.env.RdsInstanceName
    });
    callback(null, result);
  }).catch(e => {
    console.log('Error occurred.', e);
    callback(e, null);
  });
};