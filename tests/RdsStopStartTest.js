import 'babel-polyfill';
import chai from 'chai';
import aws from 'aws-sdk-mock';
import path from 'path';
aws.setSDK(path.resolve('node_modules/aws-sdk'));

let testee;

const assert = chai.assert;

describe('rds-stop-start', () => {
    let startDBInstanceCalled = false;
    let stopDBInstanceCalled = false;
    beforeEach(() => {
        startDBInstanceCalled = false;
        stopDBInstanceCalled = false;
        aws.mock('RDS', 'startDBInstance', (params, callback) => {
            console.log('startDBInstance', params);
            startDBInstanceCalled = true;
            callback(null, 'OK');
        });
        aws.mock('RDS', 'stopDBInstance', (params, callback) => {
            console.log('stopDBInstance', params);
            stopDBInstanceCalled = true;
            callback(null, 'OK');
        });
        process.env.AwsRegion = 'ap-northeast-1';
        process.env.RdsInstanceName = 'mydbinstance';
        testee = require('../RdsStopStart');
    });
    it('start', done => {
        testee.start({
            "account": "123456789012",
            "region": "ap-northeast-1",
            "detail": {},
            "detail-type": "Scheduled Event",
            "source": "aws.events",
            "time": "1970-01-01T00:00:00Z",
            "id": "cdc73f9d-aea9-11e3-9d5a-835b769c0d9c",
            "resources": [
                "arn:aws:events:us-east-1:123456789012:rule/my-schedule"
            ]
        }, null, (error, result) => {
            assert.equal(null, error);
            assert.equal(true, startDBInstanceCalled);
            done();
        });
    });
    it('stop', done => {
        testee.stop({
            "account": "123456789012",
            "region": "ap-northeast-1",
            "detail": {},
            "detail-type": "Scheduled Event",
            "source": "aws.events",
            "time": "1970-01-01T00:00:00Z",
            "id": "cdc73f9d-aea9-11e3-9d5a-835b769c0d9c",
            "resources": [
                "arn:aws:events:us-east-1:123456789012:rule/my-schedule"
            ]
        }, null, (error, result) => {
            assert.equal(null, error);
            assert.equal(true, stopDBInstanceCalled);
            done();
        });
    });
});