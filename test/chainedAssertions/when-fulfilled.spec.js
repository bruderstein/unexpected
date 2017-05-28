/*global expect*/
describe('when fulfilled adverbial assertion', function () {
    it('should delegate to the next assertion with the resolved value', function () {
        return expect(new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve({ foo: 'bar' });
                }, 0);
            })).whenFulfilled()
            .toSatisfy({ foo: 'bar' });
    });
});
