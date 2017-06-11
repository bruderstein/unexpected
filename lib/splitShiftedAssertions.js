var chainingStandardErrorMessage = require('./chainingStandardErrorMessage');
var UnexpectedError = require('./UnexpectedError');

module.exports = function splitShiftedAssertions(wrappedExpect, calledAssertions, error) {

    var totalAssertionCount = calledAssertions.length;
    var currentIndex = totalAssertionCount - 1;

    var currentAssertion = calledAssertions[currentIndex];
    currentIndex--;
    var previousAssertion = calledAssertions[currentIndex];
    if (previousAssertion) {
        wrappedExpect.errorMode = calledAssertions[0].errorMode || 'default';
    }

    var wrappedError = error;

    while (previousAssertion && previousAssertion.shiftNext) {
        var newContext = {
            calledAssertions: calledAssertions.slice(currentIndex + 1, totalAssertionCount)
        };

        var fakeExpectForShiftedAssertion = Object.create(wrappedExpect);
        fakeExpectForShiftedAssertion.standardErrorMessage = chainingStandardErrorMessage.bind(null, newContext);
        fakeExpectForShiftedAssertion.errorMode = currentAssertion.errorMode || 'default';
        wrappedError = new UnexpectedError(fakeExpectForShiftedAssertion, wrappedError);
        wrappedError.originalError = error.originalError;
        currentAssertion = previousAssertion;
        previousAssertion = calledAssertions[--currentIndex];
    }

    return new UnexpectedError(wrappedExpect, wrappedError);
};
