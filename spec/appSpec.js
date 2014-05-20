/* jshint expr: true */
describe('App', function() {
    'use strict';
    var expect = chai.expect;

    describe('retrieve and parse resources', function() {
        it('buildData', function(done) {
            var callback = sinon.stub(),
                results = app.buildData(callback);
            //expect(callback.callCount).to.equal(20);
            //TODO actually test something, I have lots to learn about javascript unit testing
            done();
        });
    });
});

